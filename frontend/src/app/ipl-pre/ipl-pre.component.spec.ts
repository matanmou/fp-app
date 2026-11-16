import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject, of, throwError } from 'rxjs';
import { IplPreComponent } from './ipl-pre.component';
import { TeamsService } from '../teams.service';
import { PickService } from '../pick.service';
import { Pick } from '../models/pick';
import { Team } from '../models/team';

const teams: Team[] = [
  { id: 1, teamName: 'מכבי', pColor: 'yellow', sColor: 'blue' },
  { id: 2, teamName: 'הפועל', pColor: 'red', sColor: 'white' },
  { id: 3, teamName: 'בית"ר', pColor: 'black', sColor: 'yellow' }
];

describe('IplPreComponent', () => {
  let fixture: ComponentFixture<IplPreComponent>;
  let component: IplPreComponent;
  let modalPick: Subject<number>;
  let modalService: { show: ReturnType<typeof vi.fn> };
  let pickService: { postPick: ReturnType<typeof vi.fn>; errorHandel: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    modalPick = new Subject<number>();
    modalService = { show: vi.fn(() => ({ content: { pick: modalPick } })) };
    pickService = { postPick: vi.fn(), errorHandel: vi.fn() };
    router = { navigate: vi.fn() };
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [IplPreComponent],
      providers: [
        { provide: BsModalService, useValue: modalService },
        { provide: Router, useValue: router },
        { provide: TeamsService, useValue: { teams: signal(teams) } },
        { provide: PickService, useValue: pickService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IplPreComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => alertSpy.mockRestore());

  /** Opens the modal for a place and simulates choosing a team. */
  function choose(place: number, teamId: number): void {
    modalPick = new Subject<number>();
    component.openModal(place);
    modalPick.next(teamId);
  }

  it('starts with an empty 14-row table', () => {
    expect(component.chosenTeams()).toHaveLength(14);
    expect(component.chosenTeams().every(t => t === null)).toBe(true);
  });

  it('renders 14 rows with "בחר קבוצה"', async () => {
    await fixture.whenStable();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(14);
    expect(rows[0].textContent).toContain('בחר קבוצה');
  });

  describe('openModal', () => {
    it('opens TeamListComponent with the teams, place and current table', () => {
      component.openModal(4);

      const [, config] = modalService.show.mock.calls[0];
      expect(config.initialState).toEqual({ teams, palce: 4, cTeam: component.chosenTeams() });
    });

    it('places the chosen team at the right position', () => {
      choose(2, 3);

      expect(component.chosenTeams()[1]).toEqual({ ...teams[2], chosenP: 2 });
    });

    it('moves a team that was already chosen elsewhere', () => {
      choose(1, 2);
      choose(5, 2);

      expect(component.chosenTeams()[0]).toBeNull();
      expect(component.chosenTeams()[4]).toEqual({ ...teams[1], chosenP: 5 });
    });

    it('replaces the team that was in that place', () => {
      choose(1, 1);
      choose(1, 2);

      expect(component.chosenTeams()[0]?.id).toBe(2);
      expect(component.chosenTeams().filter(t => t?.id === 1)).toHaveLength(0);
    });

    it('ignores an unknown team id', () => {
      choose(1, 999);

      expect(component.chosenTeams().every(t => t === null)).toBe(true);
    });

    it('shows the team name in the table after choosing', async () => {
      choose(1, 1);
      await fixture.whenStable();

      const firstRow = fixture.nativeElement.querySelector('tbody tr');
      expect(firstRow.textContent).toContain('מכבי');
    });
  });

  describe('submitPick', () => {
    it('shows an alert and does not send when no team was chosen', () => {
      component.submitPick('a', 'b');

      expect(alertSpy).toHaveBeenCalledWith('אנא בחר לפחות קבוצה אחת');
      expect(pickService.postPick).not.toHaveBeenCalled();
    });

    it('builds the pick with p1..p14 (0 for empty places)', () => {
      pickService.postPick.mockReturnValue(of({ id: 'x' }));
      choose(1, 2);
      choose(3, 1);

      component.submitPick('my pick', 'matan');

      const sent = pickService.postPick.mock.calls[0][0] as Pick;
      expect(sent.predictName).toBe('my pick');
      expect(sent.userName).toBe('matan');
      expect(sent.season).toBe(2026);
      expect(sent.p1).toBe(2);
      expect(sent.p2).toBe(0);
      expect(sent.p3).toBe(1);
      expect(sent.p14).toBe(0);
    });

    it('uses default names when the inputs are empty', () => {
      pickService.postPick.mockReturnValue(of({ id: 'x' }));
      choose(1, 1);

      component.submitPick('', '');

      const sent = pickService.postPick.mock.calls[0][0] as Pick;
      expect(sent.predictName).toBe('ניחוש טבלת 2026/2027');
      expect(sent.userName).toBe('אנונימי');
    });

    it('navigates to /show with the new id on success', () => {
      pickService.postPick.mockReturnValue(of({ id: 'new-id' }));
      choose(1, 1);

      component.submitPick('a', 'b');

      expect(router.navigate).toHaveBeenCalledWith(['/show'], { queryParams: { id: 'new-id' } });
      expect(component.load()).toBe(false);
    });

    it('sets load to true while the request is in flight', () => {
      const response = new Subject<Pick>();
      pickService.postPick.mockReturnValue(response);
      choose(1, 1);

      component.submitPick('a', 'b');
      expect(component.load()).toBe(true);

      response.next({ id: 'x' } as Pick);
      expect(component.load()).toBe(false);
    });

    it('calls errorHandel and resets load on error', () => {
      const err = new HttpErrorResponse({ status: 400 });
      pickService.postPick.mockReturnValue(throwError(() => err));
      choose(1, 1);

      component.submitPick('a', 'b');

      expect(pickService.errorHandel).toHaveBeenCalledWith(err);
      expect(component.load()).toBe(false);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('clicking "שמירה" sends the input values', async () => {
      pickService.postPick.mockReturnValue(of({ id: 'x' }));
      choose(1, 1);
      await fixture.whenStable();

      const el: HTMLElement = fixture.nativeElement;
      (el.querySelector('#name') as HTMLInputElement).value = 'from input';
      (el.querySelector('#pickBy') as HTMLInputElement).value = 'user';
      (el.querySelector('button.btn-primary') as HTMLButtonElement).click();

      const sent = pickService.postPick.mock.calls[0][0] as Pick;
      expect(sent.predictName).toBe('from input');
      expect(sent.userName).toBe('user');
    });
  });
});
