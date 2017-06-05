import { IEvent } from './shared/event.model';
import { EventService } from './shared/event.service';
import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";

@Injectable()
export class EventListResolver implements Resolve<IEvent[]> {
    constructor(private eventService: EventService) { }

    resolve() {
        return this.eventService.getEvents();
    }
}