import { MigrationInterface, QueryRunner } from 'typeorm';

const TEAMS: Array<[string, string, string]> = [
  ['Maccabi Tel Aviv', '#FFD700', '#0038A8'],
  ['Maccabi Haifa', '#004C93', '#FFFFFF'],
  ["Hapoel Be'er Sheva", '#E30613', '#FFFFFF'],
  ['Beitar Jerusalem', '#FFD700', '#000000'],
  ['Hapoel Tel Aviv', '#E30613', '#FFFFFF'],
  ['Hapoel Jerusalem', '#E30613', '#000000'],
  ['Hapoel Haifa', '#E30613', '#000000'],
  ['Hapoel Petah Tikva', '#0055A4', '#FFFFFF'],
  ['Maccabi Netanya', '#FFD700', '#000000'],
  ['Bnei Sakhnin', '#E30613', '#FFFFFF'],
  ['Ironi Kiryat Shmona', '#0055A4', '#FFFFFF'],
  ['Ironi Tiberias', '#5BC2E7', '#FFFFFF'],
  ['Maccabi Petah Tikva', '#0055A4', '#FFFFFF'],
  ['Hapoel Ramat Gan', '#E30613', '#FFFFFF'],
];

/**
 * Reference data for the teams table. Inserts only when the table is empty,
 * so it never duplicates or overwrites existing rows.
 */
export class SeedTeams1794800619810 implements MigrationInterface {
  name = 'SeedTeams1794800619810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const [{ cnt }] = await queryRunner.query(
      'SELECT COUNT(*) AS cnt FROM `iplpredict_teams`',
    );
    if (Number(cnt) > 0) return;

    const placeholders = TEAMS.map(() => '(?, ?, ?)').join(', ');
    await queryRunner.query(
      `INSERT INTO \`iplpredict_teams\` (\`teamName\`, \`pColor\`, \`sColor\`) VALUES ${placeholders}`,
      TEAMS.flat(),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const placeholders = TEAMS.map(() => '?').join(', ');
    await queryRunner.query(
      `DELETE FROM \`iplpredict_teams\` WHERE \`teamName\` IN (${placeholders})`,
      TEAMS.map((t) => t[0]),
    );
  }
}
