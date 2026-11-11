import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TeamListComponent } from '../team-list/team-list.component';
import { TeamsService } from '../teams.service';
import { isNull } from 'util';
import { PickService } from '../pick.service';
let IplPreComponent = class IplPreComponent {
    constructor(modalService, teamService, pickService) {
        this.modalService = modalService;
        this.teamService = teamService;
        this.pickService = pickService;
        this.colors = "#3a7e3a";
        this.teams = [];
        this.chosenTeams = [];
        setTimeout(() => this.teams = teamService.teams, 200);
        for (let i = 0; i < 14; i++) {
            this.chosenTeams.push(null);
        }
    }
    ngOnInit() {
    }
    openModal(template, placeC) {
        const initialState = {
            teams: this.teams,
            palce: placeC,
            cTeam: this.chosenTeams
        };
        this.modalRef = this.modalService.show(TeamListComponent, { initialState });
        this.modalRef.content.pick.subscribe(result => {
            let indx = this.teams.findIndex(team => team.id == result);
            let delIndex = this.chosenTeams.findIndex(team => team != null && team.id == result);
            console.log(this.teams);
            if (delIndex != -1)
                this.chosenTeams[delIndex] = null;
            this.chosenTeams[placeC - 1] = {
                id: this.teams[indx].id,
                teamName: this.teams[indx].teamName,
                pColor: this.teams[indx].pColor,
                sColor: this.teams[indx].sColor,
                chosenP: placeC
            };
            console.log(this.chosenTeams);
        });
        this.modalRef.content.closeBtnName = 'סגור';
    }
    submitPick() {
        this.pickName = document.getElementById('name').value;
        this.userName = document.getElementById('pickBy').value;
        let pick = {
            id: null,
            name: this.pickName,
            userName: this.userName,
            date: null,
            p1: isNull(this.chosenTeams[0]) ? 0 : this.chosenTeams[0].id,
            p2: isNull(this.chosenTeams[1]) ? 0 : this.chosenTeams[1].id,
            p3: isNull(this.chosenTeams[2]) ? 0 : this.chosenTeams[2].id,
            p4: isNull(this.chosenTeams[3]) ? 0 : this.chosenTeams[3].id,
            p5: isNull(this.chosenTeams[4]) ? 0 : this.chosenTeams[4].id,
            p6: isNull(this.chosenTeams[5]) ? 0 : this.chosenTeams[5].id,
            p7: isNull(this.chosenTeams[6]) ? 0 : this.chosenTeams[6].id,
            p8: isNull(this.chosenTeams[7]) ? 0 : this.chosenTeams[7].id,
            p9: isNull(this.chosenTeams[8]) ? 0 : this.chosenTeams[8].id,
            p10: isNull(this.chosenTeams[9]) ? 0 : this.chosenTeams[9].id,
            p11: isNull(this.chosenTeams[10]) ? 0 : this.chosenTeams[10].id,
            p12: isNull(this.chosenTeams[11]) ? 0 : this.chosenTeams[11].id,
            p13: isNull(this.chosenTeams[12]) ? 0 : this.chosenTeams[12].id,
            p14: isNull(this.chosenTeams[13]) ? 0 : this.chosenTeams[13].id
        };
        this.pickService.postPick(pick);
    }
};
IplPreComponent = tslib_1.__decorate([
    Component({
        selector: 'app-ipl-pre',
        templateUrl: './ipl-pre.component.html',
        styleUrls: ['./ipl-pre.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [BsModalService, TeamsService, PickService])
], IplPreComponent);
export { IplPreComponent };
//# sourceMappingURL=ipl-pre.component.js.map