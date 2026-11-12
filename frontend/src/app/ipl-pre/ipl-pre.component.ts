import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ChosenTeam } from '../models/chosen-team';
import { Pick, TABLE_SIZE } from '../models/pick';
import { TeamListComponent } from '../team-list/team-list.component';
import { TeamsService } from '../teams.service';
import { PickService } from '../pick.service';

@Component({
  selector: 'app-ipl-pre',
  templateUrl: './ipl-pre.component.html',
  styleUrls: ['./ipl-pre.component.css']
})
export class IplPreComponent {
  private readonly modalService = inject(BsModalService);
  private readonly router = inject(Router);
  private readonly teamService = inject(TeamsService);
  private readonly pickService = inject(PickService);

  readonly chosenTeams = signal<(ChosenTeam | null)[]>(Array(TABLE_SIZE).fill(null));
  readonly load = signal(false);

  openModal(placeC: number): void {
    const teams = this.teamService.teams();
    const modalRef = this.modalService.show(TeamListComponent, {
      initialState: { teams, palce: placeC, cTeam: this.chosenTeams() }
    });
    modalRef.content?.pick.subscribe(result => {
      const team = teams.find(t => t.id == result);
      if (!team) return;
      this.chosenTeams.update(current => {
        const next = current.map(t => (t != null && t.id == result ? null : t));
        next[placeC - 1] = { ...team, chosenP: placeC };
        return next;
      });
    });
  }

  submitPick(pickName: string, userName: string): void {
    const chosen = this.chosenTeams();
    if (chosen.every(t => t == null)) {
      alert('אנא בחר לפחות קבוצה אחת');
      return;
    }
    const pick = {
      id: '',
      predictName: pickName == '' ? 'ניחוש טבלת 2026/2027' : pickName,
      userName: userName == '' ? 'אנונימי' : userName,
      date: '',
      season: 2026
    } as Pick;
    chosen.forEach((t, i) => {
      (pick as unknown as Record<string, number>)[`p${i + 1}`] = t?.id ?? 0;
    });

    this.load.set(true);
    this.pickService.postPick(pick).subscribe({
      next: saved => {
        this.load.set(false);
        this.router.navigate(['/show'], { queryParams: { id: saved.id } });
      },
      error: (err: HttpErrorResponse) => {
        this.load.set(false);
        this.pickService.errorHandel(err);
      }
    });
  }
}
