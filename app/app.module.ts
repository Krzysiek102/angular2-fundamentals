import { LocationValidator } from './events/location-validator.directive';
import { VoterService } from './events/event-details/voter.service';
import { UpvoteComponent } from './events/event-details/upvote.component';
import { ModalTriggerDirective } from './common/modalTrigger.directive';
import { SimpleModalComponent } from './common/simpleModal.component';
import { JQ_TOKEN } from './common/jQuery.service';
import { DurationPipe } from './events/shared/duration.pipe';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './user/auth.service';
import { BrowserModule } from '@angular/platform-browser'
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventListResolver } from './events/events-list-resolver.service';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { EventService } from './events/shared/event.service'
import { EventThumbnailComponent } from './events/event-thumbnail.component'
import { EventsAppComponent } from './events-app.component'
import { EventsListComponent } from './events/events-list.component'
import { NavBarComponent } from './nav/navbar.component'
import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { appRoutes } from './route';

declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        CreateEventComponent,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        SimpleModalComponent,
        UpvoteComponent,
        ModalTriggerDirective,
        DurationPipe,
        LocationValidator,
        Error404Component
    ],
    providers: [
        EventService,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        EventRouteActivator,
        EventListResolver,
        AuthService,
        VoterService,
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {

}

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this event, do you really want to cancel?');
    }
    return true;
}