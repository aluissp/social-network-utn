import fs from 'fs';
import path from 'path';
import Sequelize, { Sequelize as SequelizeConstructor } from 'sequelize';
import config from '../db/config/database-postgres.js';

// Models
import { User } from './User.js';

const sequelize = new SequelizeConstructor(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);

export default db;
