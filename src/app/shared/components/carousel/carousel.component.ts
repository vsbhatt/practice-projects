import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() label: string;
  @Input() content: any[];
  // set default index for image slider in alert details view
  currentImage = 0;

  constructor() {
  }

  ngOnInit() { }

  /**
  * For Slider in alert details page to move slides
  * @param index whether to go right or left
  */
  changeSliderCurrentImage(index) {
    this.currentImage = this.currentImage + index;
  }

}
