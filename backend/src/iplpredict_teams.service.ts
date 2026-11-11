import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IplPredictTeams } from './iplpredict_teams.entity';

@Injectable()
export class IplPredictTeamstService {
  constructor(@InjectRepository(IplPredictTeams) private teams: Repository<IplPredictTeams>) {}

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
