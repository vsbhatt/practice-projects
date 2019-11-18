import { Injectable } from '@angular/core';
import { People, PaginationResponse, Film, Planet, Starship } from '../../models/people.model';
import { Observable } from 'rxjs/Observable';
import { Pagination } from '../../models/pagination.model';
import { mergeMap } from 'rxjs/operators';
import { HttpClientApiService } from '../http/http-client-api.service';

@Injectable()
export class StarWarsClientApiService {

  private people: People;
  constructor(private _httpService: HttpClientApiService) { }

  // call url common method
  callUrl(url: string): Observable<any> {
    return this._httpService.get(url);
  }

  // get people value
  public get getPeopleValue(): People {
    return this.people;
  }

  // set latest people value
  public set setPeopleValue(people: People) {
    this.people = people;
  }

  // set favourite people in local storage
  setFavouritePeople(people: Array<People>): void {
    localStorage.setItem('favourite-people', JSON.stringify(people));
  }

  // get all favourite people from local storage
  getAllFavouritePeople(): Array<People> {
    return localStorage.getItem('favourite-people') ?
      JSON.parse(localStorage.getItem('favourite-people')) : [];
  }

  // get specific person by ID
  getPersonById(id: number): Observable<any> {
    return this._httpService.get(`people/${id}`);
  }

  // get all people using pagination
  getPeople(paginationRequest: Pagination) {
    return this._httpService.get(`people/?page=${paginationRequest.PageNumber}`)
      .pipe(mergeMap(async (response: any) => {
        const paginationResponse = new PaginationResponse<People>();
        paginationResponse.result = response.results;
        paginationResponse.totalRecords = response.count;
        return paginationResponse;
      }));
  }

  // search with people name
  searchPeople(value: string, paginationRequest: Pagination) {
    return this._httpService.get(`people/?search=${value}&page=${paginationRequest.PageNumber}`)
      .pipe(mergeMap(async (response: any) => {
        const paginationResponse = new PaginationResponse<People>();
        paginationResponse.result = response.results;
        paginationResponse.totalRecords = response.count;
        return paginationResponse;
      }));
  }

  // search with films name
  searchWithFilms(value: string, paginationRequest: Pagination) {
    return this._httpService.get(`films/?search=${value}&page=${paginationRequest.PageNumber}`)
      .pipe(mergeMap(async (response: any) => {
        const paginationResponse = new PaginationResponse<Film>();
        paginationResponse.result = response.results.map(x => {
          return {
            title: x.title,
            description: x.opening_crawl
          } as Film
        });
        paginationResponse.totalRecords = response.count;
        return paginationResponse;
      }));
  }

  // search with planets name
  searchPlanets(value: string, paginationRequest: Pagination) {
    return this._httpService.get(`planets/?search=${value}&page=${paginationRequest.PageNumber}`)
      .pipe(mergeMap(async (response: any) => {
        const paginationResponse = new PaginationResponse<Planet>();
        paginationResponse.result = response.results;
        paginationResponse.totalRecords = response.count;
        return paginationResponse;
      }));
  }

  // search with speaceships
  searchSpacships(value: string, paginationRequest: Pagination) {
    return this._httpService.get(`starships/?search=${value}&page=${paginationRequest.PageNumber}`)
      .pipe(mergeMap(async (response: any) => {
        const paginationResponse = new PaginationResponse<Starship>();
        paginationResponse.result = response.results;
        paginationResponse.totalRecords = response.count;
        return paginationResponse;
      }));
  }
}
