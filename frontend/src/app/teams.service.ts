import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, shareReplay } from 'rxjs';
import { Team } from './models/team';
import { DB_URL } from './tokens';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(DB_URL) + '/ipl-predict/teams';

  /** All teams, fetched once and shared. */
  readonly teams$ = this.http.get<Team[]>(this.api).pipe(
    catchError(err => {
      console.error('Failed to load teams', err);
      return of([] as Team[]);
    }),
    shareReplay(1)
  );

  /** Teams as a signal (empty until loaded). */
  readonly teams = toSignal(this.teams$, { initialValue: [] as Team[] });
}
