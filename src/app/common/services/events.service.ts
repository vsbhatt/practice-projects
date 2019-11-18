import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

interface Message {
  type: string;
  payload: any;
}

export type MessageCallback = (payload: any) => void;

@Injectable()
export class EventsService {

  constructor() { }

  private handler = new Subject<Message>();

  // common method to broadcast data or message
  broadcast(type: string, payload: any) {
    this.handler.next({ type, payload });
  }

  // common method to subscribe data or message
  subscribe(type: string, callback: MessageCallback): Subscription {
    return this.handler.pipe(filter((message: any) => message.type === type))
      .pipe(map((message: any) => message.payload)).subscribe(callback);
  }

  // get all events
  getEvents(): Observable<any> {
    return this.handler.asObservable();
  }
}
