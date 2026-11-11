import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { Subject } from "rxjs";
let TeamListComponent = class TeamListComponent {
    constructor(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    ngOnInit() {
        this.pick = new Subject();
    }
    alreadyChose(team) {
        let chck = this.cTeam.findIndex(t => t != null && t.id == team.id);
        return chck == -1 ? true : false;
    }
    teamChose(id) {
        this.pick.next(id);
        this.bsModalRef.hide();
    }
    setMyStyle(tem) {
        let styles = {
            'background-image': 'linear-gradient(to left, ' + tem.pColor + ', ' + tem.pColor + ',' + tem.sColor + ')',
            'color': tem.sColor,
            'font-size': "20px"
        };
        return styles;
    }
    setCPlace(tem) {
        let cp = this.cTeam.find(t => t != null && t.id == tem.id);
        let styles = {
            'content': 'eef'
        };
        return "dsfsdf";
    }
};
TeamListComponent = tslib_1.__decorate([
    Component({
        selector: "app-team-list",
        templateUrl: "./team-list.component.html",
        styleUrls: ["./team-list.component.css"]
    }),
    tslib_1.__metadata("design:paramtypes", [BsModalRef])
], TeamListComponent);
export { TeamListComponent };
//# sourceMappingURL=team-list.component.js.map