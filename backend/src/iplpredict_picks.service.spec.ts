import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IplPredictPicksService } from './iplpredict_picks.service';
import { IplPredictPicks } from './iplpredict_picks.entity';

describe('IplPredictPicksService', () => {
  let service: IplPredictPicksService;
  let getCount: jest.Mock;
  let repo: {
    findOneOrFail: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    createQueryBuilder: jest.Mock;
  };

  beforeEach(async () => {
    getCount = jest.fn().mockResolvedValue(0);
    const queryBuilder = { where: jest.fn().mockReturnThis(), getCount };

    repo = {
      findOneOrFail: jest.fn(),
      create: jest.fn((p) => ({ ...p })),
      save: jest.fn((p) => Promise.resolve(p)),
      createQueryBuilder: jest.fn(() => queryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IplPredictPicksService,
        { provide: getRepositoryToken(IplPredictPicks), useValue: repo },
      ],
    }).compile();

    service = module.get(IplPredictPicksService);
  });

  afterEach(() => jest.restoreAllMocks());

  it('addPick generates a free id, sets an ISO date and saves', async () => {
    jest
      .spyOn(service, 'randomIdString')
      .mockReturnValueOnce('TAKEN00001')
      .mockReturnValueOnce('FREE000002');
    getCount.mockResolvedValueOnce(1).mockResolvedValueOnce(0);

    const result = await service.addPick({ id: 'FROMCLIENT', p1: 3 } as IplPredictPicks);

    expect(result.id).toBe('FREE000002');
    expect(new Date(result.date).toISOString()).toBe(result.date);
    expect(result.p1).toBe(3);
    expect(repo.save).toHaveBeenCalledWith(result);
  });

  it('findPick throws NotFoundException when the pick does not exist', async () => {
    repo.findOneOrFail.mockRejectedValue(new Error('EntityNotFound'));

    await expect(service.findPick('NOPE')).rejects.toThrow(NotFoundException);
  });
});
