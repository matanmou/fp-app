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
exports.IplPredictPicksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const iplpredict_picks_entity_1 = require("./iplpredict_picks.entity");
let IplPredictPicksService = class IplPredictPicksService {
    constructor(picks) {
        this.picks = picks;
    }
    getAll() {
        return this.picks.find();
    }
    getSpecific(id) {
        return this.findPick(id);
    }
    async addPick(newPick) {
        let id;
        let cnt;
        do {
            id = this.randomIdString();
            cnt = await this.picks.createQueryBuilder('pick').where("pick.id = :id", { id: id }).getCount();
        } while (cnt != 0);
        newPick.id = id;
        newPick.date = new Date().toISOString();
        const pick = this.picks.create(newPick);
        this.picks.save(pick);
        return pick;
    }
    async changeTeamName() {
        return;
    }
    async findPick(id) {
        try {
            const team = await this.picks.findOneOrFail({ where: { id: id } });
            return team;
        }
        catch (err) {
            throw new common_1.NotFoundException("There is no Pick with that ID number");
        }
    }
    randomIdString() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let res = "";
        for (let i = 0; i < 10; i++) {
            res += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return res;
    }
};
IplPredictPicksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(iplpredict_picks_entity_1.IplPredictPicks)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IplPredictPicksService);
exports.IplPredictPicksService = IplPredictPicksService;
//# sourceMappingURL=iplpredict_picks.service.js.map