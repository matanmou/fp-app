// DataSource used by the TypeORM CLI (migration:run / revert / generate).
import { DataSource } from 'typeorm';
import config from './ormconfig';

export default new DataSource(config);
