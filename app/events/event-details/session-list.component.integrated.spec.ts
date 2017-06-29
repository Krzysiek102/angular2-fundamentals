import { CollapsibleWellComponent } from './../../common/collapsible-well.component';
import { DurationPipe } from './../shared/duration.pipe';
import { UpvoteComponent } from './upvote.component';
import { VoterService } from './voter.service';
import { AuthService } from './../../user/auth.service';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { SessionListComponent } from './session-list.component';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>;
    let component: SessionListComponent;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: { userName: "Joe" },
        };
        const mockVoterService = {
            userHasVoted: () => true,
        };
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                UpvoteComponent,
                DurationPipe,
                CollapsibleWellComponent,
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService },
            ],
            schemas: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initial display', () => {

        it('should have the correct session title', () => {
            component.sessions = [
                {
                    id: 3,
                    name: "Session 1",
                    presenter: "Joe",
                    duration: 1,
                    level: "beginner",
                    abstract: "abstract",
                    voters: ["john", "bob"],
                },
            ];
            component.filterBy = "all";
            component.sortBy = "name";
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector("[well-title]").textContent)
                .toContain('Session 1');
            expect(debugEl.query(By.css("[well-title")).nativeElement.textContent)
                .toContain('Session 1');
        });

    });

});
