import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Initial schema. Uses IF NOT EXISTS so it is safe on databases whose tables
 * were already created earlier by "synchronize: true".
 */
export class CreateTables1794800618810 implements MigrationInterface {
  name = 'CreateTables1794800618810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`iplpredict_teams\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`teamName\` varchar(255) NOT NULL,
        \`pColor\` varchar(255) NOT NULL,
        \`sColor\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`iplpredict_picks\` (
        \`id\` varchar(255) NOT NULL,
        \`predictName\` varchar(255) NOT NULL,
        \`userName\` varchar(255) NOT NULL,
        \`date\` varchar(255) NOT NULL,
        \`season\` int NOT NULL,
        \`p1\` int NOT NULL,
        \`p2\` int NOT NULL,
        \`p3\` int NOT NULL,
        \`p4\` int NOT NULL,
        \`p5\` int NOT NULL,
        \`p6\` int NOT NULL,
        \`p7\` int NOT NULL,
        \`p8\` int NOT NULL,
        \`p9\` int NOT NULL,
        \`p10\` int NOT NULL,
        \`p11\` int NOT NULL,
        \`p12\` int NOT NULL,
        \`p13\` int NOT NULL,
        \`p14\` int NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS `iplpredict_picks`');
    await queryRunner.query('DROP TABLE IF EXISTS `iplpredict_teams`');
  }
}
