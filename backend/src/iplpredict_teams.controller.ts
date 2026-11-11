import { Controller, Get } from '@nestjs/common';
import { IplPredictTeams } from './iplpredict_teams.entity';
import { IplPredictTeamstService } from './iplpredict_teams.service';

@Controller('ipl-predict/teams')
export class IplPredictTeamsController {
  constructor(private readonly iplTeamsServ: IplPredictTeamstService) {}

  @Get()
  getAllTeams(): Promise<IplPredictTeams[]> {
    return this.iplTeamsServ.getAll();
  }

  // @Get(':id')
  // getSpecificTeam(@Param('id') id:number): Promise<IplPredictTeams>{
  //   const team = this.iplTeamsServ.findTeam(id);
  //   return team;
  // }

  // @Post()
  // createTeam(@Body('name') name: string): Promise<IplPredictTeams>{
  //   //const team = this.iplTeamsServ.addTeam();
  //   return;
  // }

  // @Patch(':id')
  // updateTeamName(@Param('id') id: number, @Body('name') name: string): Promise<IplPredictTeams>{
  //   //const team = this.iplTeamsServ.changeTeamName();
  //   return;
  // }

  // @Delete(':id')
  // async deleteTeam(@Param('id') id: number){
  //   await this.iplTeamsServ.deleteTeam(id);
  //   return new HttpException("The Team was deleted!", 200);
  // }
}
