import Sequelize, { Sequelize as SequelizeConstructor } from 'sequelize';
import config from '../db/config/database-postgres.js';

// Models
import { User } from './User.js';
import { Profile } from './Profile.js';
import { Follows } from './Follows.js';

const sequelize = new SequelizeConstructor(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);
db.Profile = Profile(sequelize, Sequelize);
db.Follows = Follows(sequelize, Sequelize);

// Associations
// Profile -> User
db.Profile.belongsTo(db.User);
db.User.hasOne(db.Profile);

// Profile <-> Follows
db.Profile.belongsToMany(db.Profile, {
	through: db.Follows,
	as: 'following',
});

export default db;
