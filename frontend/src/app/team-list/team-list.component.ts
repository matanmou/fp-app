import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Team } from '../models/team';
import { ChosenTeam } from '../models/chosen-team';

/** Modal content – values are supplied through BsModalService `initialState`. */
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {
  readonly bsModalRef = inject(BsModalRef);

  teams: Team[] = [];
  palce = 0;
  cTeam: (ChosenTeam | null)[] = [];
  readonly pick = new Subject<number>();

  alreadyChose(team: Team): boolean {
    return !this.cTeam.some(t => t != null && t.id == team.id);
  }

  teamChose(id: number): void {
    this.pick.next(id);
    this.pick.complete();
    this.bsModalRef.hide();
  }

  setMyStyle(tem: Team): Record<string, string> {
    return {
      'background-image': 'linear-gradient(to left, white, ' + tem.pColor + ',' + tem.sColor + ')',
      'background-repeat': 'no-repeat',
      'background-size': '50%',
      'font-size': '20px'
    };
  }
}
