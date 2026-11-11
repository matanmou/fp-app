import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PickService } from '../pick.service';
import { ActivatedRoute } from '@angular/router';
let ShowPredictComponent = class ShowPredictComponent {
    constructor(pickService, route) {
        this.pickService = pickService;
        this.route = route;
        this.chosenTeams = this.pickService.pickedTeams;
        console.log(this.pickService.pickBy);
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
            this.pickService.getPick(this.id);
        });
    }
};
ShowPredictComponent = tslib_1.__decorate([
    Component({
        selector: 'app-show-predict',
        templateUrl: './show-predict.component.html',
        styleUrls: ['./show-predict.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [PickService, ActivatedRoute])
], ShowPredictComponent);
export { ShowPredictComponent };
//# sourceMappingURL=show-predict.component.js.map