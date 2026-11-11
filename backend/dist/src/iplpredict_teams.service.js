"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IplPredictTeamstService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const iplpredict_teams_entity_1 = require("./iplpredict_teams.entity");
let IplPredictTeamstService = class IplPredictTeamstService {
    constructor(teams) {
        this.teams = teams;
    }
    getAll() {
        return this.teams.find();
    }
    async findTeam(id) {
        try {
            const team = await this.teams.findOneOrFail({ where: { id: id } });
            return team;
        }
        catch (err) {
            throw new common_1.NotFoundException("There is no Team with that ID number");
        }
    }
};
IplPredictTeamstService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(iplpredict_teams_entity_1.IplPredictTeams)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IplPredictTeamstService);
exports.IplPredictTeamstService = IplPredictTeamstService;
//# sourceMappingURL=iplpredict_teams.service.js.map