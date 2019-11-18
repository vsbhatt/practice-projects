import { Component, OnInit, Input } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Film } from '../../../../models/people.model';
import { Router } from '@angular/router';
import { StarWarsClientApiService } from '../../../../common/services';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  // parent child communication variable
  @Input() people: any;

  constructor(
    private _router: Router,
    private _starWarsAPIClientService: StarWarsClientApiService
  ) { }

  ngOnInit() {
    if (!this._starWarsAPIClientService.getPeopleValue) {
      this.goToLandingPage();
    } else {
      this.people = this._starWarsAPIClientService.getPeopleValue;
      // get person related details on load
      this.getFilms();
      this.getSpecies();
      this.getStarShips();
      this.getHomeworld();
    }
  }

  /**
  * get species
  */
  getSpecies() {
    const speciesObservables = [];
    this.people.species.forEach(x => {
      speciesObservables.push(this._starWarsAPIClientService.callUrl(x));
    });

    forkJoin(speciesObservables).subscribe(x => {
      this.people.speciesNames = x;
    });
  }

  // get starships
  getStarShips(): void {
    const starShipsObservables = [];
    this.people.starships.forEach(x => {
      starShipsObservables.push(this._starWarsAPIClientService.callUrl(x));
    });

    forkJoin(starShipsObservables).subscribe(x => {
      this.people.ships = x;
    });
  }

  // get homeworld
  getHomeworld(): void {
    this._starWarsAPIClientService.callUrl(this.people.homeworld).subscribe(x => {
      this.people.home = x.name;
    });
  }

  // get films
  getFilms(): void {
    const filmsObservables = [];
    this._starWarsAPIClientService.getPeopleValue.films.forEach(x => {
      filmsObservables.push(this._starWarsAPIClientService.callUrl(x));
    });

    forkJoin(filmsObservables).subscribe((x: any) => {
      this.people.filmNames = x.map(z => {
        return {
          title: z.title,
          description: z.opening_crawl,
          url: z.url
        } as Film;
      });
    });
  }

  // go to people listiing page
  goToLandingPage() {
    this._router.navigateByUrl('');
  }
}
