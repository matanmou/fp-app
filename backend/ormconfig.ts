
import { IplPredictPicks } from 'src/iplpredict_picks.entity';
import { IplPredictTeams } from 'src/iplpredict_teams.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "database": "ipflDB",
    "username": "root",
    "password": "changeme",
    "entities": [
        IplPredictPicks,
        IplPredictTeams
    ],
    "synchronize": true
};

export default config;
