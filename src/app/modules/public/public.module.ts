import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PublicLayoutComponent } from './public-layout.component';

import { PublicRoutingModule } from './public-routing.module';
import { LandingListComponent, PersonCardComponent, FavouritePeopleComponent, PersonDetailsComponent, ComicStoresListComponent, SearchResultListingComponent } from './components';
import { EventsService, StarWarsClientApiService } from '../../common/services';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ],
  declarations: [PublicLayoutComponent, LandingListComponent, PersonDetailsComponent, FavouritePeopleComponent, ComicStoresListComponent, SearchResultListingComponent, PersonCardComponent],
  providers: [StarWarsClientApiService, EventsService]
})
export class PublicModule { }
