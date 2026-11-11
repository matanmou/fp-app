import { Repository } from 'typeorm';
import { IplPredictTeams } from './iplpredict_teams.entity';
export declare class IplPredictTeamstService {
    private teams;
    constructor(teams: Repository<IplPredictTeams>);
    getAll(): Promise<IplPredictTeams[]>;
    findTeam(id: number): Promise<IplPredictTeams>;
}
