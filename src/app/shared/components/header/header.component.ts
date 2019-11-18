import { Component, OnInit, SimpleChanges, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { People, Starship, Film } from '../../../models/people.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // global and common variables
  searchText = '';
  people: Array<People> = [];
  planets = [];
  spaceships: Array<Starship> = [];
  films: Array<Film> = [];
  filterByUrls = [];

  // parent child communication variables
  @Output() filterBy = new EventEmitter<any>();
  @Input() showFilterBox: any;
  @Input() removeAllFilters: boolean;

  constructor(private _router: Router) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // remove filter on change event
    if (changes.removeAllFilters && this.removeAllFilters) {
      this.filterByUrls = [];
    }
  }

  // redirect to favourites page
  redirectToFavourites() {
    this._router.navigateByUrl("favourite-people");
  }

  // redirect to comic stores page
  goToComicStoreListing() {
    this._router.navigateByUrl("comic-stores");
  }

  // Search with text from searchbox
  search() {
    if (this.searchText === '') {
      return;
    }
    this._router.navigateByUrl('/search-results/' + this.searchText);
  }

  // go to person's listing page
  goToHomePage() {
    this._router.navigateByUrl('/');
  }
}
