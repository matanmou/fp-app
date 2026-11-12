import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { PickService } from '../pick.service';
import { TeamsService } from '../teams.service';
import { ChosenTeam } from '../models/chosen-team';

@Component({
  selector: 'app-show-predict',
  imports: [RouterLink],
  templateUrl: './show-predict.component.html',
  styleUrls: ['./show-predict.component.css']
})
export class ShowPredictComponent {
  private readonly pickService = inject(PickService);
  private readonly teamsService = inject(TeamsService);

  /** `?id=` query param (bound via withComponentInputBinding). */
  readonly id = input<string | undefined>();

  readonly chosenTeams = signal<(ChosenTeam | null)[]>([]);
  readonly pickName = signal('');
  readonly pickBy = signal('');
  readonly pickDate = signal('');

  constructor() {
    effect(onCleanup => {
      const id = this.id() ?? '';
      const sub = forkJoin([this.pickService.getPick(id), this.teamsService.teams$]).subscribe({
        next: ([p, teams]) => {
          this.chosenTeams.set(this.pickService.pickToChosen(p, teams));
          this.pickBy.set(p.userName);
          this.pickDate.set(p.date);
          this.pickName.set(p.predictName);
        },
        error: (err: HttpErrorResponse) => this.pickService.errorHandel(err)
      });
      onCleanup(() => sub.unsubscribe());
    });
  }
}
