import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { PickService } from './pick.service';
import { DB_URL } from './tokens';
import { Pick } from './models/pick';
import { Team } from './models/team';

const API = 'http://test/';

const teams: Team[] = [
  { id: 1, teamName: 'מכבי', pColor: 'yellow', sColor: 'blue' },
  { id: 2, teamName: 'הפועל', pColor: 'red', sColor: 'white' },
  { id: 3, teamName: 'בית"ר', pColor: 'black', sColor: 'yellow' }
];

function makePick(places: Partial<Record<string, number>> = {}): Pick {
  const pick: Record<string, unknown> = {
    id: 'abc', predictName: 'test', userName: 'matan', date: '2026-11-16', season: 2026
  };
  for (let i = 1; i <= 14; i++) pick[`p${i}`] = places[`p${i}`] ?? 0;
  return pick as unknown as Pick;
}

describe('PickService', () => {
  let service: PickService;
  let http: HttpTestingController;
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    router = { navigate: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DB_URL, useValue: API },
        { provide: Router, useValue: router }
      ]
    });
    service = TestBed.inject(PickService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  describe('postPick', () => {
    it('sends a POST with the pick to the picks endpoint', () => {
      const pick = makePick({ p1: 1 });
      let result: Pick | undefined;

      service.postPick(pick).subscribe(r => (result = r));

      const req = http.expectOne(`${API}ipl-predict/picks`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(pick);
      req.flush({ ...pick, id: 'new-id' });

      expect(result?.id).toBe('new-id');
    });
  });

  describe('getPick', () => {
    it('sends a GET to picks/:id', () => {
      const pick = makePick();
      let result: Pick | undefined;

      service.getPick('abc').subscribe(r => (result = r));

      const req = http.expectOne(`${API}ipl-predict/picks/abc`);
      expect(req.request.method).toBe('GET');
      req.flush(pick);

      expect(result).toEqual(pick);
    });
  });

  describe('pickToChosen', () => {
    it('always returns 14 rows', () => {
      expect(service.pickToChosen(makePick(), teams)).toHaveLength(14);
    });

    it('maps each team id to its row with the right chosenP', () => {
      const rows = service.pickToChosen(makePick({ p1: 2, p3: 1 }), teams);

      expect(rows[0]).toEqual({ ...teams[1], chosenP: 1 });
      expect(rows[2]).toEqual({ ...teams[0], chosenP: 3 });
    });

    it('returns null for empty places (0)', () => {
      const rows = service.pickToChosen(makePick({ p1: 1 }), teams);

      expect(rows.slice(1).every(r => r === null)).toBe(true);
    });

    it('returns null when the team id does not exist in the list', () => {
      const rows = service.pickToChosen(makePick({ p1: 99 }), teams);

      expect(rows[0]).toBeNull();
    });

    it('returns null for all rows when the team list is empty', () => {
      const rows = service.pickToChosen(makePick({ p1: 1, p2: 2 }), []);

      expect(rows.every(r => r === null)).toBe(true);
    });
  });

  describe('errorHandel', () => {
    let alertSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => alertSpy.mockRestore());

    it('navigates to /notFoundTB on 404', () => {
      service.errorHandel(new HttpErrorResponse({ status: 404 }));

      expect(router.navigate).toHaveBeenCalledWith(['/notFoundTB']);
      expect(alertSpy).not.toHaveBeenCalled();
    });

    it('shows all modelState errors on 400', () => {
      const err = new HttpErrorResponse({
        status: 400,
        error: { modelState: { name: ['Name is required'], p1: ['Bad team', 'Duplicate'] } }
      });

      service.errorHandel(err);

      const msg = alertSpy.mock.calls[0][0] as string;
      expect(msg).toContain('*Name is required');
      expect(msg).toContain('*Bad team');
      expect(msg).toContain('*Duplicate');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('does not crash on 400 without modelState', () => {
      service.errorHandel(new HttpErrorResponse({ status: 400, error: null }));

      expect(alertSpy).toHaveBeenCalledTimes(1);
    });

    it('does nothing for other status codes (e.g. 500)', () => {
      service.errorHandel(new HttpErrorResponse({ status: 500 }));

      expect(router.navigate).not.toHaveBeenCalled();
      expect(alertSpy).not.toHaveBeenCalled();
    });
  });
});
