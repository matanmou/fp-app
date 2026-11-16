import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IplPredictTeams } from './iplpredict_teams.entity';

@Injectable()
export class IplPredictTeamstService {
  constructor(@InjectRepository(IplPredictTeams) private teams: Repository<IplPredictTeams>) {}

  async onModuleInit() {
    const teamCount = await this.teams.count();
    if (teamCount === 0) {
      const teamsData = [
        { teamName: 'מכבי תל אביב', pColor: '#FFD700', sColor: '#0038A8' },
        { teamName: 'מכבי חיפה', pColor: '#004C93', sColor: '#FFFFFF' },
        { teamName: 'הפועל באר שבע', pColor: '#E30613', sColor: '#FFFFFF' },
        { teamName: 'בית/״ר ירושלים', pColor: '#FFD700', sColor: '#000000' },
        { teamName: 'הפועל תל אביב', pColor: '#E30613', sColor: '#FFFFFF' },
        { teamName: 'הפועל ירושלים', pColor: '#E30613', sColor: '#000000' },
        { teamName: 'הפועל פתח תקווה', pColor: '#0055A4', sColor: '#FFFFFF' },
        { teamName: 'מכבי נתניה', pColor: '#FFD700', sColor: '#000000' },
        { teamName: 'בני סכנין', pColor: '#E30613', sColor: '#FFFFFF' },
        { teamName: 'עירוני קרית שמונה', pColor: '#0055A4', sColor: '#FFFFFF' },
        { teamName: 'עירוני טבריה', pColor: '#5BC2E7', sColor: '#FFFFFF' },
        { teamName: 'מכבי פתח תקווה', pColor: '#0055A4', sColor: '#FFFFFF' },
        { teamName: 'הפועל רמת גן', pColor: '#E30613', sColor: '#FFFFFF' },
      ];

      await this.teams.save(teamsData);
    }
  }

  getAll():Promise<IplPredictTeams[]>{
    return this.teams.find();
  }

  async findTeam(id: number){
    try{
    const team = await this.teams.findOneOrFail({where: {id: id}});
    return team;
    } catch(err){
      throw new NotFoundException("There is no Team with that ID number");
    }
  }
}
