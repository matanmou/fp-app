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
exports.IplPredictPicksController = void 0;
const common_1 = require("@nestjs/common");
const iplpredict_picks_service_1 = require("./iplpredict_picks.service");
const iplpredict_picks_entity_1 = require("./iplpredict_picks.entity");
let IplPredictPicksController = class IplPredictPicksController {
    constructor(picksService) {
        this.picksService = picksService;
    }
    getAllPicks() {
        return this.picksService.getAll();
    }
    getSpecificPick(id) {
        const pick = this.picksService.findPick(id);
        return pick;
    }
    createPick(newPick) {
        const pick = this.picksService.addPick(newPick);
        return pick;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IplPredictPicksController.prototype, "getAllPicks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IplPredictPicksController.prototype, "getSpecificPick", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [iplpredict_picks_entity_1.IplPredictPicks]),
    __metadata("design:returntype", Promise)
], IplPredictPicksController.prototype, "createPick", null);
IplPredictPicksController = __decorate([
    (0, common_1.Controller)('ipl-predict/picks'),
    __metadata("design:paramtypes", [iplpredict_picks_service_1.IplPredictPicksService])
], IplPredictPicksController);
exports.IplPredictPicksController = IplPredictPicksController;
//# sourceMappingURL=iplpredict_picks.controller.js.map