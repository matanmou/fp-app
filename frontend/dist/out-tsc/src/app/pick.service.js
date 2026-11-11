import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamsService } from './teams.service';
let PickService = class PickService {
    constructor(http, teamService, api) {
        this.http = http;
        this.teamService = teamService;
        this.pickedTeams = [];
        this.pickName = '';
        this.pickBy = '';
        this.api = api + '/picks';
    }
    postPick(pic) {
        this.http.post(this.api, pic).subscribe(data => {
            this.pickToChose(data);
        });
    }
    getPick(id) {
        this.http.get(this.api + '/' + id).subscribe(p => {
            this.pickToChose(p[0]);
            this.pickBy = p[0].userName;
            this.pickName = p[0].name;
            console.log(this.pickBy);
        });
    }
    pickToChose(p) {
        for (let i = 0; i < 14; i++) {
            let pl = "p" + (i + 1);
            if (p[pl] > 0) {
                let team = this.teamService.teams.find(t => t.id == p[pl]);
                this.pickedTeams[i] = {
                    id: team.id,
                    teamName: team.teamName,
                    pColor: team.pColor,
                    sColor: team.sColor,
                    chosenP: i + 1
                };
            }
            else {
                this.pickedTeams[i] = null;
            }
        }
    }
};
PickService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(2, Inject('dbUrl')),
    tslib_1.__metadata("design:paramtypes", [HttpClient, TeamsService, String])
], PickService);
export { PickService };
//# sourceMappingURL=pick.service.js.map