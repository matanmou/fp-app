import { Repository } from 'typeorm';
import { IplPredictPicks } from './iplpredict_picks.entity';
export declare class IplPredictPicksService {
    private picks;
    constructor(picks: Repository<IplPredictPicks>);
    getAll(): Promise<IplPredictPicks[]>;
    getSpecific(id: string): Promise<IplPredictPicks>;
    addPick(newPick: IplPredictPicks): Promise<IplPredictPicks>;
    changeTeamName(): Promise<void>;
    findPick(id: string): Promise<IplPredictPicks>;
    randomIdString(): string;
}
