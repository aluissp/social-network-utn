import Sequelize, { Sequelize as SequelizeConstructor } from 'sequelize';
import config from '../db/config/database-postgres.js';

// Models
import { User } from './User.js';
import { Profile } from './Profile.js';
import { Follows } from './Follows.js';
import { Post } from './Post.js';
import { Remark } from './Remark.js';

const sequelize = new SequelizeConstructor(config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);
db.Profile = Profile(sequelize, Sequelize);
db.Follows = Follows(sequelize, Sequelize);
db.Post = Post(sequelize, Sequelize);
db.Remark = Remark(sequelize, Sequelize);

// Associations
// Profile -> User
db.Profile.belongsTo(db.User);
db.User.hasOne(db.Profile);

// Profile <-> Follows
db.Profile.belongsToMany(db.Profile, {
	through: db.Follows,
	as: 'following',
});

// Profile -> Post
db.Profile.hasMany(db.Post);

// Post -> Profile
db.Post.belongsTo(db.Profile);

// Post -> Remark
db.Post.hasMany(db.Remark);

// Remark -> Post
db.Remark.belongsTo(db.Post);

// Remark -> Profile
db.Remark.belongsTo(db.Profile);

// Profile -> Remark
db.Profile.hasMany(db.Remark);

export default db;
