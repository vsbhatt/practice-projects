import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderComponent,
    PaginatorComponent,
    CarouselComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    CarouselComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
