import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { StarWarsClientApiService } from './services';
import { HttpClientApiService } from './http/http-client-api.service';

@NgModule({
  declarations: [
  ],
  providers: [
    HttpClient,
    HttpClientModule,
    StarWarsClientApiService,
    HttpClientApiService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CommonServicesModule { }
