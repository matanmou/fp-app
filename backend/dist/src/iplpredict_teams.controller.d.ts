import { IplPredictTeams } from './iplpredict_teams.entity';
import { IplPredictTeamstService } from './iplpredict_teams.service';
export declare class IplPredictTeamsController {
    private readonly iplTeamsServ;
    constructor(iplTeamsServ: IplPredictTeamstService);
    getAllTeams(): Promise<IplPredictTeams[]>;
}
