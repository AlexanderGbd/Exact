import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {CachingHttpClient} from '../../http/caching-http.service';
import {MockCachingHttpClient} from '../../http/caching-http.service.spec';
import {User} from '../../types/user';

describe('UserService', () => {
    const testUsers: User<'simple'>[] = [{
        id: 0,
        username: 'testUser-0',
        points: 42,
        teams: [],
        pinnedSets: []
    }];

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: CachingHttpClient, useClass: MockCachingHttpClient}
        ]
    }));

    it('should be created', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    it('should return correct list() result', (done) => {
        const service: UserService = TestBed.get(UserService);
        const httpClient: MockCachingHttpClient = TestBed.get(CachingHttpClient);

        httpClient.responses[service.url] = testUsers;

        service.list().subscribe(result => {
            expect(result).toBe(testUsers);
            done();
        });
    });

    it('should return correct simple get() result', (done) => {
        const service: UserService = TestBed.get(UserService);
        const httpClient: MockCachingHttpClient = TestBed.get(CachingHttpClient);

        httpClient.responses[`${service.url}${testUsers[0].id}/`] = testUsers[0];

        service.get(testUsers[0].id).subscribe(result => {
            expect(result).toBe(testUsers[0]);
            done();
        });
    });
});