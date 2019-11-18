import { Component, OnInit } from '@angular/core';
import { PaginationResponse, People, Film, Planet, Starship } from '../../../../models/people.model';
import { Pagination } from '../../../../models/pagination.model';
import { Subscription } from 'rxjs';
import { StarWarsClientApiService } from '../../../../common/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result-listing',
  templateUrl: './search-result-listing.component.html',
  styleUrls: ['./search-result-listing.component.css']
})
export class SearchResultListingComponent implements OnInit {

  // people pagination request and response
  peoplePaginationRequest = new Pagination();
  peopleResponse = new PaginationResponse<People>();

  // films pagination request and response
  filmsPaginationRequest = new Pagination();
  filmsResponse = new PaginationResponse<Film>();

  // planets pagination request and response
  planetsPaginationRequest = new Pagination();
  planetsResponse = new PaginationResponse<Planet>();

  // spaceships pagination request and response
  spaceShipsPaginationRequest = new Pagination();
  spaceShipsResponse = new PaginationResponse<Starship>();

  subscription = new Subscription();
  searchTerm: string;
  isLoading = false;

  constructor(
    private _starWarsApiClientService: StarWarsClientApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get search parameter and based on that filter values
    this.subscription.add(this.route.params.subscribe(x => {
      this.searchTerm = x['param'];
      // search with parameters
      this.searchPeople(null);
      this.searchStarships(null);
      this.searchFilms(null);
      this.searchPlanets(null);
    }));
  }


  /**
   * @param  {any|null} pagination
   * search with pagination passing null
   */
  searchPeople(pagination: any | null) {
    this.isLoading = true;
    this.peoplePaginationRequest.PageNumber = !pagination ? 1 : pagination.page;
    this.peopleResponse.result = !this.peopleResponse.result ? [] : this.peopleResponse.result;
    this.subscription.add(this._starWarsApiClientService.searchPeople(this.searchTerm, this.peoplePaginationRequest).subscribe(response => {
      this.peopleResponse.totalRecords = response.totalRecords;
      this.peopleResponse.result = response.result;
      this.peoplePaginationRequest.PageSize = this.peopleResponse.result.length;
      this.isLoading = false
    }, () => this.isLoading = false));
  }

  /**
   * @param  {any|null} pagination
   * search with starships with pagination starting as null
   */
  searchStarships(pagination: any | null) {
    this.isLoading = true;
    this.spaceShipsPaginationRequest.PageNumber = !pagination ? 1 : pagination.page;
    this.spaceShipsResponse.result = !this.spaceShipsResponse.result ? [] : this.spaceShipsResponse.result;
    this.subscription.add(this._starWarsApiClientService.searchSpacships(this.searchTerm, this.spaceShipsPaginationRequest).subscribe(response => {
      this.spaceShipsResponse.totalRecords = response.totalRecords;
      this.spaceShipsResponse.result = response.result;
      this.spaceShipsPaginationRequest.PageSize = this.spaceShipsResponse.result.length;
      this.isLoading = false;
    }, () => this.isLoading = false));
  }


  /**
   * @param  {any|null} pagination
   * search with films with pagination starting as null
   */
  searchFilms(pagination: any | null) {
    this.isLoading = true;
    this.filmsPaginationRequest.PageNumber = !pagination ? 1 : pagination.page;
    this.filmsResponse.result = !this.filmsResponse.result ? [] : this.filmsResponse.result;
    this.subscription.add(this._starWarsApiClientService.searchWithFilms(this.searchTerm, this.filmsPaginationRequest).subscribe(response => {
      this.filmsResponse.totalRecords = response.totalRecords;
      this.filmsResponse.result = response.result;
      this.spaceShipsPaginationRequest.PageSize = this.filmsResponse.result.length;
      this.isLoading = false;
    }, () => this.isLoading = false));
  }

  // search with planets with pagination starting as null
  searchPlanets(pagination: any | null) {
    this.isLoading = true;
    this.planetsPaginationRequest.PageNumber = !pagination ? 1 : pagination.page;
    this.planetsResponse.result = !this.planetsResponse.result ? [] : this.planetsResponse.result;
    this.subscription.add(this._starWarsApiClientService.searchPlanets(this.searchTerm, this.planetsPaginationRequest).subscribe(response => {
      this.planetsResponse.totalRecords = response.totalRecords;
      this.planetsResponse.result = response.result;
      this.planetsPaginationRequest.PageSize = this.planetsResponse.result.length;
      this.isLoading = false;
    }, () => this.isLoading = false));
  }

  ngOnDestroy(): void {
    // unsubscribe all subscription on page destroy
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
