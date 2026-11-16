import { IplPredictPicks } from './src/iplpredict_picks.entity';
import { IplPredictTeams } from './src/iplpredict_teams.entity';
import { CreateTables1794800618810 } from './src/migrations/1794800618810-CreateTables';
import { SeedTeams1794800619810 } from './src/migrations/1794800619810-SeedTeams';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [
        IplPredictPicks,
        IplPredictTeams,
    ],
    // Never let TypeORM change the schema automatically in production.
    synchronize: false,
    // Schema + reference data are versioned in migrations (src/migrations).
    migrations: [
        CreateTables1794800618810,
        SeedTeams1794800619810,
    ],
    migrationsTableName: 'migrations',
    // Apply pending migrations on startup; each one runs in its own transaction.
    migrationsRun: process.env.DB_MIGRATIONS_RUN !== 'false',
    migrationsTransactionMode: 'each',
    // Print migration activity (and errors) to the pod logs.
    logging: ['error', 'warn', 'migration'],
};

export default config;
