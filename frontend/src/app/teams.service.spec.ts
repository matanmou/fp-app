import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TeamsService } from './teams.service';
import { DB_URL } from './tokens';
import { Team } from './models/team';

const API = 'http://test/';
const URL = `${API}ipl-predict/teams`;

const teams: Team[] = [
  { id: 1, teamName: 'מכבי', pColor: 'yellow', sColor: 'blue' },
  { id: 2, teamName: 'הפועל', pColor: 'red', sColor: 'white' }
];

describe('TeamsService', () => {
  let service: TeamsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DB_URL, useValue: API }
      ]
    });
    service = TestBed.inject(TeamsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('teams signal starts as an empty array and fills once loaded', () => {
    expect(service.teams()).toEqual([]);

    http.expectOne(URL).flush(teams);

    expect(service.teams()).toEqual(teams);
  });

  it('sends only one HTTP request even with several subscribers (shareReplay)', () => {
    const results: Team[][] = [];

    service.teams$.subscribe(t => results.push(t));
    service.teams$.subscribe(t => results.push(t));

    // toSignal + the two subscriptions above share one request
    http.expectOne(URL).flush(teams);

    service.teams$.subscribe(t => results.push(t)); // late subscriber gets cached value
    expect(results).toEqual([teams, teams, teams]);
  });

  it('returns an empty array when the request fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    let result: Team[] | undefined;

    service.teams$.subscribe(t => (result = t));
    http.expectOne(URL).flush('boom', { status: 500, statusText: 'Server Error' });

    expect(result).toEqual([]);
    expect(service.teams()).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
