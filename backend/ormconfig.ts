
import { IplPredictPicks } from 'src/iplpredict_picks.entity';
import { IplPredictTeams } from 'src/iplpredict_teams.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": parseInt(process.env.DB_PORT, 10),
    "database": process.env.DB_NAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "entities": [
        IplPredictPicks,
        IplPredictTeams
    ],
    "synchronize": true
};

export default config;
