import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../models/pagination.model';
import { PaginationResponse, People, Starship, Species, Planet } from '../../../../models/people.model';
import { Subscription } from 'rxjs/Subscription';
import { StarWarsClientApiService, EventsService } from '../../../../common/services';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { EventConstants } from '../../../../shared/constants/events.constants';

@Component({
  selector: 'app-landing-list',
  templateUrl: './landing-list.component.html',
  styleUrls: ['./landing-list.component.css']
})
export class LandingListComponent implements OnInit {

  // common and global variable declaration
  paginationRequest = new Pagination();
  peopleResponse = new PaginationResponse<People>();
  filteredPeople: Array<People> = [];
  showPagination = false;
  subscription = new Subscription();
  isLoading = false;

  constructor(
    private _starWarsClientAPIService: StarWarsClientApiService,
    private _eventsService: EventsService
  ) { }

  ngOnInit(): void {
    // on init get all people with initial pagination
    this.getPeople(null);

    // call function to filter with starships
    this.subscription.add(this._eventsService.subscribe(EventConstants.filterStarship, (starships: Starship) => {
      const observables = [];
      starships.pilots.forEach(pilot => {
        observables.push(this._starWarsClientAPIService.callUrl(pilot));
      });
      this.setPeople(observables);
    }));

    // call function to filter with species
    this.subscription.add(this._eventsService.subscribe(EventConstants.filterSpecies, (species: Species) => {
      const observables = [];
      species.people.forEach(x => {
        observables.push(this._starWarsClientAPIService.callUrl(x));
      });
      this.setPeople(observables);
    }));

    // call function to filter with homeWorld
    this.subscription.add(this._eventsService.subscribe(EventConstants.filterHomeworld, (planet: Planet) => {
      /* There is no pagination structure in API to display filter result. so, we are displaying all Planets */
      const observables = [];
      planet.residents.forEach(x => {
        observables.push(this._starWarsClientAPIService.callUrl(x));
      });
      this.setPeople(observables);
    }));
  }

  // set people after subscription filter
  setPeople(observables: any[]) {
    this.isLoading = true;
    this.subscription.add(forkJoin(observables).subscribe((x: any) => {
      this.filteredPeople = [];
      this.peopleResponse.totalRecords = x.length;
      this.peopleResponse.result = x;
      this.showPagination = false;
      this.paginationRequest.PageSize = 0;
      this.isLoading = false;
    }));
  }

  /**
   * get people
   */
  getPeople(pagination: any | null) {
    this.isLoading = true;
    this.paginationRequest.PageNumber = !pagination ? 1 : pagination.page;
    this.peopleResponse.result = !this.peopleResponse.result ? [] : this.peopleResponse.result;
    this._starWarsClientAPIService.getPeople(this.paginationRequest).subscribe(response => {
      this.filteredPeople = [];
      this.peopleResponse.totalRecords = response.totalRecords;
      this.peopleResponse.result = response.result;
      this.showPagination = true;
      this.paginationRequest.PageSize = this.peopleResponse.result.length;
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
