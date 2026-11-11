import { Component, OnInit } from '@angular/core';
import { PickService } from '../pick.service';
import { ChosenTeam } from '../models/chosen-team';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-predict',
  templateUrl: './show-predict.component.html',
  styleUrls: ['./show-predict.component.css']
})
export class ShowPredictComponent implements OnInit {
  chosenTeams:ChosenTeam[];
  id:string;
  pickName:string;
  pickBy:string;
  pickDate:string;
  constructor(private pickService:PickService, private route: ActivatedRoute) {
    this.pickService.pgTeams.subscribe(c=> {this.chosenTeams = c});
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      setTimeout(()=>
      {this.pickService.getPick(this.id);},400);
  });
  setTimeout(()=>{this.getNames()}, 400);
  }

  getNames(){
    this.pickService.pickName.subscribe(p => {this.pickName = p;});
    this.pickService.pickBy.subscribe(p=> {this.pickBy = p;});
    this.pickService.pickDate.subscribe(p=> {this.pickDate = p;});
  }

}
