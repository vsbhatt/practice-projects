import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './public-layout.component';
import { LandingListComponent, PersonDetailsComponent, FavouritePeopleComponent, ComicStoresListComponent, SearchResultListingComponent } from './components';
const routes: Routes = [
  {
    path: '', component: PublicLayoutComponent,
    children: [
      { path: '', component: LandingListComponent },
      { path: 'person-details', component: PersonDetailsComponent },
      {
        path: 'favourite-people', component: FavouritePeopleComponent
      },
      {
        path: 'comic-stores', component: ComicStoresListComponent
      },
      {
        path: 'search-results/:param', component: SearchResultListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
