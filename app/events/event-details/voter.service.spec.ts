import { Observable } from 'rxjs/Observable';
import { ISession } from './../shared/event.model';
import { VoterService } from './voter.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

describe('Voter Service', () => {
    let mockHttp;
    let voterService: VoterService;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            var session = { id: 6, voters: ["joe", "john"] };
            mockHttp.delete.and.returnValue(Observable.of(false))
            voterService.deleteVoter(3, <ISession>session, "joe");
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        });
    });
});
