"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iplpredict_picks_entity_1 = require("./src/iplpredict_picks.entity");
const iplpredict_teams_entity_1 = require("./src/iplpredict_teams.entity");
const config = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "database": "ipflDB",
    "username": "root",
    "password": "changeme",
    "entities": [
        iplpredict_picks_entity_1.IplPredictPicks,
        iplpredict_teams_entity_1.IplPredictTeams
    ],
    "synchronize": true
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map