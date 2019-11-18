import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { EventConstants } from '../../shared/constants/events.constants';

@Injectable()
export class LoaderService {

  constructor(private _eventsService: EventsService) { }

  show() {
    this._eventsService.broadcast(EventConstants.displayLoading, true);
  }

  hide() {
    this._eventsService.broadcast(EventConstants.displayLoading, false);
  }
}
