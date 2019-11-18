import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    // commented for loader for now
    // this.subscription.add(this._eventsService.subscribe(EventConstants.displayLoading, (isLoading) => {
    //   this.isLoading = isLoading;
    // }));
  }
}
