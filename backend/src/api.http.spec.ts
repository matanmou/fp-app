/**
 * HTTP-level tests: real Nest app + real routing, but the services are mocked,
 * so no database is needed.
 */
import { INestApplication, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { IplPredictPicksController } from './iplpredict_picks.controller';
import { IplPredictPicksService } from './iplpredict_picks.service';
import { IplPredictTeamsController } from './iplpredict_teams.controller';
import { IplPredictTeamstService } from './iplpredict_teams.service';

const teams = [{ id: 1, teamName: 'מכבי', pColor: 'yellow', sColor: 'blue' }];
const pick = { id: 'ABC1234567', predictName: 'my pick', userName: 'matan', season: 2026, p1: 1 };

describe('API (HTTP)', () => {
  let app: INestApplication;
  const picksService = { getAll: jest.fn(), findPick: jest.fn(), addPick: jest.fn() };
  const teamsService = { getAll: jest.fn() };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [IplPredictPicksController, IplPredictTeamsController],
      providers: [
        { provide: IplPredictPicksService, useValue: picksService },
        { provide: IplPredictTeamstService, useValue: teamsService },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(() => app.close());
  beforeEach(() => jest.clearAllMocks());

  it('GET /ipl-predict/teams returns 200 with all teams', async () => {
    teamsService.getAll.mockResolvedValue(teams);

    const res = await request(app.getHttpServer()).get('/ipl-predict/teams').expect(200);

    expect(res.body).toEqual(teams);
  });

  it('GET /ipl-predict/picks/:id returns 404 when the pick does not exist', async () => {
    picksService.findPick.mockRejectedValue(new NotFoundException('There is no Pick with that ID number'));

    const res = await request(app.getHttpServer()).get('/ipl-predict/picks/NOPE').expect(404);

    expect(res.body.message).toBe('There is no Pick with that ID number');
  });

  it('POST /ipl-predict/picks returns 201 with the created pick', async () => {
    picksService.addPick.mockResolvedValue(pick);

    const res = await request(app.getHttpServer())
      .post('/ipl-predict/picks')
      .send({ ...pick, id: '' })
      .expect(201);

    expect(res.body).toEqual(pick);
  });
});
