const mongoose = require('mongoose');
const { to } = require('../tools/to');

const TeamsModels = mongoose.model('TeamsModels', {
  userId: String,
  team: [],
});

const bootstrapTeam = (userId) => {
  return new Promise(async (resolve, reject) => {
    const newTeam = new TeamsModels({ userId, team: [] });
    await newTeam.save();
    resolve();
  });
};

const addPokemon = (userId, pokemon) => {
  return new Promise(async (resolve, reject) => {
    const [err, team] = await to(TeamsModels.findOne({ userId }).exec());
    if (err) return reject(err);

    if (team.team.length === 6) {
      reject('Teams must be less or equal than 6');
    } else {
      team.team.push(pokemon);
      await team.save();
      resolve();
    }
  });
};

const setTeam = (userId, team) => {
  return new Promise(async (resolve, reject) => {
    const [err, dbTeam] = await to(TeamsModels.findOne({ userId }).exec());

    if (err) return reject(err);

    dbTeam.team = team;
    await dbTeam.save();
    resolve();
  });
};

const getTeamOfUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    const [err, dbTeam] = await to(TeamsModels.findOne({ userId }).exec());

    if (err) return reject(err);

    resolve(dbTeam.team || []);
  });
};

const cleanUpTeam = () => {
  return new Promise(async (resolve, reject) => {
    await TeamsModels.deleteMany({}).exec();
    resolve();
  });
};

const deletePokemon = (userId, pokedexNumber) => {
  return new Promise(async (resolve, reject) => {
    const [err, dbTeam] = await to(TeamsModels.findOne({ userId }).exec());
    if (err || !dbTeam) return reject(err);

    for (const key in dbTeam.team) {
      if (dbTeam.team[key].pokedexNumber == pokedexNumber) {
        dbTeam.team.splice(key, 1);
        break;
      }
    }
    resolve();
  });
};

module.exports = {
  bootstrapTeam,
  setTeam,
  getTeamOfUser,
  addPokemon,
  cleanUpTeam,
  deletePokemon,
};
