import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ShowPredictComponent } from './show-predict.component';
import { PickService } from '../pick.service';
import { TeamsService } from '../teams.service';
import { ChosenTeam } from '../models/chosen-team';
import { Pick } from '../models/pick';
import { Team } from '../models/team';

const teams: Team[] = [{ id: 1, teamName: 'מכבי', pColor: 'yellow', sColor: 'blue' }];

const pick = {
  id: 'abc', predictName: 'my pick', userName: 'matan', date: '2026-11-16', season: 2026, p1: 1
} as Pick;

const rows: (ChosenTeam | null)[] = [{ ...teams[0], chosenP: 1 }, null];

describe('ShowPredictComponent', () => {
  let fixture: ComponentFixture<ShowPredictComponent>;
  let component: ShowPredictComponent;
  let pickService: {
    getPick: ReturnType<typeof vi.fn>;
    pickToChosen: ReturnType<typeof vi.fn>;
    errorHandel: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    pickService = {
      getPick: vi.fn(() => of(pick)),
      pickToChosen: vi.fn(() => rows),
      errorHandel: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ShowPredictComponent],
      providers: [
        provideRouter([]),
        { provide: PickService, useValue: pickService },
        { provide: TeamsService, useValue: { teams$: of(teams) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPredictComponent);
    component = fixture.componentInstance;
  });

  async function setId(id: string | undefined): Promise<void> {
    fixture.componentRef.setInput('id', id);
    await fixture.whenStable();
  }

  it('loads the pick by id and fills the signals', async () => {
    await setId('abc');

    expect(pickService.getPick).toHaveBeenCalledWith('abc');
    expect(pickService.pickToChosen).toHaveBeenCalledWith(pick, teams);
    expect(component.chosenTeams()).toEqual(rows);
    expect(component.pickName()).toBe('my pick');
    expect(component.pickBy()).toBe('matan');
    expect(component.pickDate()).toBe('2026-11-16');
  });

  it('renders the table and the details', async () => {
    await setId('abc');
    const el: HTMLElement = fixture.nativeElement;

    const trs = el.querySelectorAll('tbody tr');
    expect(trs).toHaveLength(2);
    expect(trs[0].textContent).toContain('מכבי');
    expect(trs[1].textContent).toContain('לא נבחרה קבוצה');
    expect((el.querySelector('#name') as HTMLInputElement).value).toBe('my pick');
    expect((el.querySelector('#pickBy') as HTMLInputElement).value).toBe('matan');
  });

  it('builds the share link from the id', async () => {
    await setId('abc');

    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/show?id=abc');
  });

  it('sends an empty id when there is no id', async () => {
    await setId(undefined);

    expect(pickService.getPick).toHaveBeenCalledWith('');
  });

  it('reloads when the id changes', async () => {
    await setId('abc');
    await setId('def');

    expect(pickService.getPick).toHaveBeenLastCalledWith('def');
    expect(pickService.getPick).toHaveBeenCalledTimes(2);
  });

  it('calls errorHandel when loading fails', async () => {
    const err = new HttpErrorResponse({ status: 404 });
    pickService.getPick.mockReturnValue(throwError(() => err));

    await setId('missing');

    expect(pickService.errorHandel).toHaveBeenCalledWith(err);
    expect(component.chosenTeams()).toEqual([]);
  });
});
