import { Component, OnInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { People, Species, Starship, Planet } from '../../../../../models/people.model';
import { StarWarsClientApiService, EventsService } from '../../../../../common/services';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { EventConstants } from '../../../../../shared/constants/events.constants';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements OnInit {

  // common anf global variables
  subscription = new Subscription();
  species: Array<Species> = [];
  starships: Array<Starship> = [];
  planet: Planet;
  isFavourite = false;

  // parent child communication variable
  @Input() people: People;
  @Input() isReadOnlyCard = false;

  constructor(
    private _starWarsApiClientService: StarWarsClientApiService,
    private _eventsService: EventsService,
    private router: Router) { }

  ngOnInit() { }

  // on change of component 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.people && changes.people.currentValue) {
      // get all favourite people to mark as favourite
      const people = this._starWarsApiClientService.getAllFavouritePeople();
      this.people = changes.people.currentValue;
      if (this.people) {
        this.isFavourite = people.some(x => x.name === this.people.name);
      }
      // set species,starships,homeworld on change of value
      this.getSpecies();
      this.getStarShips();
      this.getHomeworld();
    }
    if (changes.isReadOnlyCard && changes.isReadOnlyCard.currentValue) {
      this.isReadOnlyCard = changes.isReadOnlyCard.currentValue;
    }
  }

  // mark person as favourite
  setFavourite() {
    if (!this.isReadOnlyCard) {
      this.isFavourite = !this.isFavourite;
      const people = this._starWarsApiClientService.getAllFavouritePeople();
      if (this.isFavourite) {
        people.push(this.people);
      } else {
        people.splice(people.findIndex(x => x.name === this.people.name), 1);
      }
      this._starWarsApiClientService.setFavouritePeople(people);
    }
  }

  /**
   * get species on change 
   */
  getSpecies() {
    if (!this.people.species || this.people.species.length === 0) {
      this.species = [{ name: '-' } as Species];
    }
    const speciesObservables = [];
    this.people.species.forEach(x => {
      speciesObservables.push(this._starWarsApiClientService.callUrl(x));
    });

    forkJoin(speciesObservables).subscribe((x: any) => {
      this.people.speciesNames = x;
      this.species = x;
    });
  }

  // get starships on change
  getStarShips() {
    if (!this.people.starships || this.people.starships.length === 0) {
      this.starships = [{ name: 'N/A' } as Starship];
    }
    else {
      const starShipsObservables = [];
      this.people.starships.forEach(x => {
        starShipsObservables.push(this._starWarsApiClientService.callUrl(x));
      });

      forkJoin(starShipsObservables).subscribe((x: any) => {
        this.people.ships = x;
        this.starships = x && x.length ? x : [{ name: '-' } as Starship];
      });
    }
  }

  // get homeworld on change
  getHomeworld() {
    if (!this.people.homeworld || this.people.homeworld.length === 0) {
      this.planet = {
        name: '-'
      } as Planet;
    }
    this._starWarsApiClientService.callUrl(this.people.homeworld).subscribe(x => {
      this.people.home = x.name;
      this.planet = x;
    });
  }

  // filter with starships name
  filterStarship(starship: Starship) {
    if (starship.name === '-') {
      return;
    }
    this._eventsService.broadcast(EventConstants.filterStarship, starship);
  }

  // filter with home world name
  filterHomeworld(planet: Planet) {
    if (planet.name === '-') {
      return;
    }
    this._eventsService.broadcast(EventConstants.filterHomeworld, planet);
  }

  // filter with species name
  filterSpecies(species: Species) {
    if (species.name === '-') {
      return;
    }
    this._eventsService.broadcast(EventConstants.filterSpecies, species);
  }

  // navigate to person details page
  navigateToDetails() {
    this._starWarsApiClientService.setPeopleValue = this.people;
    this.router.navigateByUrl('person-details');
  }

  ngOnDestroy(): void {
    // On destroy unsubscribe all subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
