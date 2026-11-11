import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IplPredictPicksService } from './iplpredict_picks.service';
import { IplPredictPicks } from './iplpredict_picks.entity';

@Controller('ipl-predict/picks')
export class IplPredictPicksController {
  constructor(private readonly picksService: IplPredictPicksService) {}

  @Get()
  getAllPicks(): Promise<IplPredictPicks[]> {
    return this.picksService.getAll();
  }

  @Get(':id')
  getSpecificPick(@Param('id') id:string): Promise<IplPredictPicks>{
    const pick = this.picksService.findPick(id);
    return pick;
  }

  @Post()
  createPick(@Body() newPick: IplPredictPicks): Promise<IplPredictPicks>{
    const pick = this.picksService.addPick(newPick);
    return pick;
  }


  // @Delete(':id')
  // async deletePick(@Param('id') id: number){
  //   await this.picksService.deleteTeam(id);
  //   return new HttpException("The Pick was deleted!", 200);
  // }
}
