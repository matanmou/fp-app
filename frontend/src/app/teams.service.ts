import { Injectable, Inject } from '@angular/core';
import { Team } from './models/team';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class TeamsService {
  teams: Team[] = [];
  api:string;

  constructor(private http:HttpClient, @Inject('dbUrl')api:string) {
    this.api = api+'/ipl-predict/teams';
    this.getTeams();
   }

   getTeams():any{
    this.http.get<any>(this.api).subscribe(t=> {this.teams = t});
  }   
}
