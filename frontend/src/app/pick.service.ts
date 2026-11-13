import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pick, TABLE_SIZE } from './models/pick';
import { ChosenTeam } from './models/chosen-team';
import { Team } from './models/team';
import { DB_URL } from './tokens';

@Injectable({ providedIn: 'root' })
export class PickService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly api = inject(DB_URL) + 'ipl-predict/picks';

  postPick(pick: Pick): Observable<Pick> {
    return this.http.post<Pick>(this.api, pick);
  }

  getPick(id: string): Observable<Pick> {
    return this.http.get<Pick>(`${this.api}/${id}`);
  }

  /** Converts a saved pick (p1..p14 = team ids) into table rows. */
  pickToChosen(p: Pick, teams: Team[]): (ChosenTeam | null)[] {
    const rows: (ChosenTeam | null)[] = [];
    for (let i = 0; i < TABLE_SIZE; i++) {
      const selectedTeamId = p[`p${i + 1}` as keyof Pick] as number;
      const team = selectedTeamId > 0 ? teams.find(t => t.id == selectedTeamId) : undefined;
      rows.push(team ? { ...team, chosenP: i + 1 } : null);
    }
    return rows;
  }

  errorHandel(err: HttpErrorResponse): void {
    if (err.status == 404) {
      this.router.navigate(['/notFoundTB']);
    } else if (err.status == 400) {
      const errors: string[] = [];
      const modelState: Record<string, string[]> = err.error?.modelState ?? {};
      for (const key in modelState) {
        errors.push(...modelState[key]);
      }
      let str = 'Errors:';
      errors.forEach(c => str += ('\n*' + c));
      str += '\nPlease chack the form and resend it';
      alert(str);
    }
  }
}
