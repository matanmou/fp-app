import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IplPredictPicks } from './iplpredict_picks.entity';

@Injectable()
export class IplPredictPicksService {
  constructor(@InjectRepository(IplPredictPicks) private picks: Repository<IplPredictPicks>) {
  }

  getAll():Promise<IplPredictPicks[]>{
    return this.picks.find();
  }

  getSpecific(id:string){
    return this.findPick(id);
  }

  async addPick(newPick: IplPredictPicks){
    let id: string;
    let cnt: number;
    do{
      id = this.randomIdString();
      cnt = await this.picks.createQueryBuilder('pick').where("pick.id = :id", {id: id}).getCount();
    }while(cnt != 0);
    newPick.id = id;
    newPick.date = new Date().toISOString();
    const pick = this.picks.create(newPick);
    this.picks.save(pick);
    return pick;
  }

  async changeTeamName(){
    return;
  }



  async findPick(id: string){
    try{
    const team = await this.picks.findOneOrFail({where: {id: id}});
    return team;
    } catch(err){
      throw new NotFoundException("There is no Pick with that ID number");
    }
  }

   randomIdString(): string{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let res = "";
    for(let i = 0; i < 10; i++){
      res += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return res;
  }
}
