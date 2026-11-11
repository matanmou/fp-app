import { Component, OnInit, TemplateRef } from '@angular/core';
import { Team } from '../models/team';
import { ChosenTeam } from '../models/chosen-team';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TeamListComponent } from '../team-list/team-list.component';
import { TeamsService } from '../teams.service';
import { debug, isNull } from 'util';
import { Pick } from '../models/pick';
import { PickService } from '../pick.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ipl-pre',
  templateUrl: './ipl-pre.component.html',
  styleUrls: ['./ipl-pre.component.css']
})
export class IplPreComponent implements OnInit {
  colors:string = "#3a7e3a";
  teams: Team[] = [];
  chosenTeams: Array<ChosenTeam | null> = [];
  modalRef: BsModalRef | undefined;
  pickName:string | undefined;
  userName: string | undefined;
  load:boolean = false;
  constructor(private modalService: BsModalService, private router:Router, private teamService: TeamsService, private pickService:PickService){

    for(let i = 0; i < 14; i++){
      this.chosenTeams.push(null);
    }
  }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>, placeC: number) {
    do{
      this.teams = this.teamService.teams;
    }while(isNull(this.teams[0]));
    const initialState = {
      teams: this.teams,
      palce: placeC,
      cTeam: this.chosenTeams
    };
    this.modalRef = this.modalService.show(TeamListComponent, {initialState});
    this.modalRef.content.pick.subscribe((result: number) => {
      let indx = this.teams.findIndex(team=> team.id == result);
      let delIndex = this.chosenTeams.findIndex(team => team != null && team.id == result);
      if(delIndex != -1)
        this.chosenTeams[delIndex] = null;
      this.chosenTeams[placeC-1] = {
        id: this.teams[indx].id,
        teamName: this.teams[indx].teamName,
        pColor: this.teams[indx].pColor,
        sColor: this.teams[indx].sColor,
        chosenP: placeC
      }
    });
    this.modalRef.content.closeBtnName = 'סגור';
  }

  submitPick(){
    if(this.emptyArry(this.chosenTeams) == 0)
      return alert("אנא בחר לפחות קבוצה אחת");
    this.pickName = (<HTMLInputElement>document.getElementById('name')).value;
    this.userName = (<HTMLInputElement>document.getElementById('pickBy')).value;
    let pick:Pick = {
      id: '',
      predictName: this.pickName == '' ? 'ניחוש טבלת 2026/2027' : this.pickName,
      userName: this.userName == '' ? 'אנונימי' : this.userName, 
      date: '',
      season: 2026,
      p1: isNull(this.chosenTeams[0]) ? 0:this.chosenTeams[0].id,
      p2: isNull(this.chosenTeams[1]) ? 0:this.chosenTeams[1].id,
      p3: isNull(this.chosenTeams[2]) ? 0:this.chosenTeams[2].id,
      p4: isNull(this.chosenTeams[3]) ? 0:this.chosenTeams[3].id,
      p5: isNull(this.chosenTeams[4]) ? 0:this.chosenTeams[4].id,
      p6: isNull(this.chosenTeams[5]) ? 0:this.chosenTeams[5].id,
      p7: isNull(this.chosenTeams[6]) ? 0:this.chosenTeams[6].id,
      p8: isNull(this.chosenTeams[7]) ? 0:this.chosenTeams[7].id,
      p9: isNull(this.chosenTeams[8]) ? 0:this.chosenTeams[8].id,
      p10: isNull(this.chosenTeams[9]) ? 0:this.chosenTeams[9].id,
      p11: isNull(this.chosenTeams[10]) ? 0:this.chosenTeams[10].id,
      p12: isNull(this.chosenTeams[11]) ? 0:this.chosenTeams[11].id,
      p13: isNull(this.chosenTeams[12]) ? 0:this.chosenTeams[12].id,
      p14: isNull(this.chosenTeams[13]) ? 0:this.chosenTeams[13].id
    };
    this.load = true;
    this.pickService.postPick(pick);
      setTimeout(()=>{
        let id = this.pickService.pickId;
        this.router.navigate([`/show`], { queryParams: {id: id}});
        this.load = false;}, 1000);
  }

  emptyArry(arr: Array<ChosenTeam | null>): number {
    let cnt = 0;
    for (const item of arr) {
      if (!isNull(item))
        cnt++;
    }
    return cnt;
  }
}
