import {
  Component,
  OnInit,
  ɵCodegenComponentFactoryResolver
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { Team } from "../models/team";
import { Subject } from "rxjs";
import { ChosenTeam } from "../models/chosen-team";
import { delay } from "q";

@Component({
  selector: "app-team-list",
  templateUrl: "./team-list.component.html",
  styleUrls: ["./team-list.component.css"]
})
export class TeamListComponent implements OnInit {
  teams: Team[];
  palce: number[];
  cTeam: ChosenTeam[];
  pick: Subject<number>;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.pick = new Subject();
  }

  public alreadyChose(team: Team): boolean {
    let chck = this.cTeam.findIndex(t => t != null && t.id == team.id);
    return chck == -1 ? true : false;
  }

  public teamChose(id: number): void {
    this.pick.next(id);
    this.bsModalRef.hide();
  }

  setMyStyle(tem:Team) {
    let styles = {
     'background-image': 'linear-gradient(to left, white, '+tem.pColor+','+tem.sColor+')',
     'background-repeat': 'no-repeat',
     'background-size':"50%",
      //'color':tem.sColor,
      'font-size': "20px"
    };
    return styles;
  }
}
