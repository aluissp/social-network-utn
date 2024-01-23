const teamsController = require('./teams-controllers');
const { getUser } = require('../auth/users-controllers');
const { to } = require('../tools/to');
const axios = require('axios').default;

const getTeamFromUser = async (req, res) => {
  const user = await getUser(req.user.userId);
  const [teamErr, team] = await to(
    teamsController.getTeamOfUser(req.user.userId)
  );

  if (teamErr)
    return res.status(400).json({ message: 'User does not have any team' });

  res.status(200).json({ trainer: user.userName, team });
};

const setTeamToUser = async (req, res) => {
  const [err, resp] = await to(
    teamsController.setTeam(req.user.userId, req.body.team)
  );
  if (err) return res.status(400).json({ message: err });

  res.status(200).send();
};

const addPokemonToTeam = async (req, res) => {
  const pokemonName = req.body.pokemonName;

  if (!pokemonName) {
    return res.status(400).json({ message: 'Pokemon name was not given' });
  }

  let [pokeApiError, pokeApiResponse] = await to(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
  );

  if (pokeApiError) {
    return res.status(400).json({ message: pokeApiError });
  }

  const pokemon = {
    name: pokemonName,
    pokedexNumber: pokeApiResponse.data.id,
  };

  let [errorAdd, response] = await to(
    teamsController.addPokemon(req.user.userId, pokemon)
  );
  if (errorAdd) {
    return res.status(400).send({ message: errorAdd });
  }
  res.status(201).send('Pokemon was created succesfully');
};

const deletePokemonFromTeam = async (req, res) => {
  const { pokedex } = req.params;
  const [err, resp] = await to(
    teamsController.deletePokemon(req.user.userId, pokedex)
  );

  if (err) {
    return res.status(400).send({ message: err });
  }
  res.status(200).send('Pokemon was deleted succesfully');
};

module.exports = {
  getTeamFromUser,
  setTeamToUser,
  addPokemonToTeam,
  deletePokemonFromTeam,
};
