import { Component, OnInit } from '@angular/core';
import { StarWarsClientApiService } from '../../../../common/services';
import { People } from '../../../../models/people.model';

@Component({
  selector: 'app-favourite-people',
  templateUrl: './favourite-people.component.html',
  styleUrls: ['./favourite-people.component.css']
})
export class FavouritePeopleComponent implements OnInit {

  people: Array<People> = [];
  constructor(
    private _starWarsClientAPIService: StarWarsClientApiService
  ) { }

  ngOnInit() {
    // get all favourite people from local storage
    this.people = this._starWarsClientAPIService.getAllFavouritePeople();
  }

}
