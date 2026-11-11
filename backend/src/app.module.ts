import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { IplPredictPicks } from './iplpredict_picks.entity';
import { IplPredictTeams } from './iplpredict_teams.entity';
import { IplPredictPicksController } from './iplpredict_picks.controller';
import { IplPredictPicksService } from './iplpredict_picks.service';
import { IplPredictTeamstService } from './iplpredict_teams.service';
import { IplPredictTeamsController } from './iplpredict_teams.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
     TypeOrmModule.forFeature([
       IplPredictPicks,
       IplPredictTeams
      ])],
  controllers: [
    IplPredictPicksController,
    IplPredictTeamsController,
  ],
  providers: [
    IplPredictPicksService,
    IplPredictTeamstService,
  ],
})
export class AppModule {}
