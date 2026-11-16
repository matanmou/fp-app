import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TeamListComponent } from './team-list.component';
import { Team } from '../models/team';

const teams: Team[] = [
  { id: 1, teamName: 'מכבי', pColor: 'yellow', sColor: 'blue' },
  { id: 2, teamName: 'הפועל', pColor: 'red', sColor: 'white' },
  { id: 3, teamName: 'בית"ר', pColor: 'black', sColor: 'yellow' }
];

describe('TeamListComponent', () => {
  let fixture: ComponentFixture<TeamListComponent>;
  let component: TeamListComponent;
  let modalRef: { hide: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    modalRef = { hide: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [TeamListComponent],
      providers: [{ provide: BsModalRef, useValue: modalRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    component.teams = teams;
    component.palce = 3;
    component.cTeam = [null, { ...teams[1], chosenP: 2 }, null];
  });

  describe('alreadyChose', () => {
    // Note: returns true when the team has NOT been chosen yet
    it('returns true for a team that is not in the table', () => {
      expect(component.alreadyChose(teams[0])).toBe(true);
    });

    it('returns false for a team already in the table', () => {
      expect(component.alreadyChose(teams[1])).toBe(false);
    });

    it('returns true for every team when the table is empty', () => {
      component.cTeam = Array(14).fill(null);
      expect(teams.every(t => component.alreadyChose(t))).toBe(true);
    });
  });

  describe('teamChose', () => {
    it('emits the id, completes the subject and closes the modal', () => {
      const emitted: number[] = [];
      let completed = false;
      component.pick.subscribe({ next: id => emitted.push(id), complete: () => (completed = true) });

      component.teamChose(3);

      expect(emitted).toEqual([3]);
      expect(completed).toBe(true);
      expect(modalRef.hide).toHaveBeenCalledTimes(1);
    });
  });

  describe('setMyStyle', () => {
    it('builds a gradient from the team colors', () => {
      const style = component.setMyStyle(teams[0]);

      expect(style['background-image']).toBe('linear-gradient(to left, white, yellow,blue)');
      expect(style['font-size']).toBe('20px');
    });
  });

  describe('template', () => {
    it('shows the place number in the title', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.modal-title').textContent).toContain('3');
    });

    it('renders a button for every team, with chosen teams marked with .chos', () => {
      fixture.detectChanges();
      const buttons = fixture.nativeElement.querySelectorAll('.list-group button');
      const chosen = fixture.nativeElement.querySelectorAll('.list-group button.chos');

      expect(buttons).toHaveLength(3);
      expect(chosen).toHaveLength(1);
      expect(chosen[0].textContent).toContain('הפועל');
    });

    it('clicking a team emits its id', () => {
      fixture.detectChanges();
      const emitted: number[] = [];
      component.pick.subscribe(id => emitted.push(id));

      fixture.nativeElement.querySelectorAll('.list-group button')[2].click();

      expect(emitted).toEqual([3]);
    });

    it('clicking "סגור" closes the modal', () => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('.modal-footer button').click();
      expect(modalRef.hide).toHaveBeenCalled();
    });
  });
});
