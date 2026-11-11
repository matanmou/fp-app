import { IplPredictPicksService } from './iplpredict_picks.service';
import { IplPredictPicks } from './iplpredict_picks.entity';
export declare class IplPredictPicksController {
    private readonly picksService;
    constructor(picksService: IplPredictPicksService);
    getAllPicks(): Promise<IplPredictPicks[]>;
    getSpecificPick(id: string): Promise<IplPredictPicks>;
    createPick(newPick: IplPredictPicks): Promise<IplPredictPicks>;
}
