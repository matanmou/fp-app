import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let TeamsService = class TeamsService {
    constructor(http, api) {
        this.http = http;
        this.teams = [];
        this.api = api + '/teams';
        this.getTeams();
    }
    getTeams() {
        this.http.get(this.api).subscribe(t => { this.teams = t; });
    }
};
TeamsService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, Inject('dbUrl')),
    tslib_1.__metadata("design:paramtypes", [HttpClient, String])
], TeamsService);
export { TeamsService };
//# sourceMappingURL=teams.service.js.map