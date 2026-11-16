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
        { teamName: 'Maccabi Tel Aviv', pColor: '#FFD700', sColor: '#0038A8' },
        { teamName: 'Maccabi Haifa', pColor: '#004C93', sColor: '#FFFFFF' },
        { teamName: "Hapoel Be'er Sheva", pColor: '#E30613', sColor: '#FFFFFF' },
        { teamName: 'Beitar Jerusalem', pColor: '#FFD700', sColor: '#000000' },
        { teamName: 'Hapoel Tel Aviv', pColor: '#E30613', sColor: '#FFFFFF' },
        { teamName: 'Hapoel Jerusalem', pColor: '#E30613', sColor: '#000000' },
        { teamName: 'Hapoel Petah Tikva', pColor: '#0055A4', sColor: '#FFFFFF' },
        { teamName: 'Maccabi Netanya', pColor: '#FFD700', sColor: '#000000' },
        { teamName: 'Bnei Sakhnin', pColor: '#E30613', sColor: '#FFFFFF' },
        { teamName: 'Ironi Kiryat Shmona', pColor: '#0055A4', sColor: '#FFFFFF' },
        { teamName: 'Ironi Tiberias', pColor: '#5BC2E7', sColor: '#FFFFFF' },
        { teamName: 'Maccabi Petah Tikva', pColor: '#0055A4', sColor: '#FFFFFF' },
        { teamName: 'Hapoel Ramat Gan', pColor: '#E30613', sColor: '#FFFFFF' },
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
