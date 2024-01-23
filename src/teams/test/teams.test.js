const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../app').app;

const { cleanUpUsers, registerUser } = require('../../auth/users-controllers');
const { cleanUpTeam } = require('../teams-controllers');

beforeEach(async () => {
  await registerUser('Luis Perugachi', '1234');
  await registerUser('Test', '1234');
});

afterEach(async () => {
  await cleanUpTeam();
  await cleanUpUsers();
});

describe('Suite de pruebas de teams', () => {
  it('should return the team of given user.', (done) => {
    const team = [{ name: 'Charizard' }, { name: 'Blastoise' }];
    chai
      .request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Luis Perugachi', password: '1234' })
      .end((err, res) => {
        const token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai
          .request(app)
          .put('/teams')
          .send({ team })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai
              .request(app)
              .get('/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                // Tiene equipo con charizard y blastoise
                // {trainer: Luis Perugachi, team: {pokemon}}
                chai.assert.equal(res.statusCode, 200);
                chai.assert.equal(res.body.trainer, 'Luis Perugachi');
                chai.assert.equal(res.body.team.length, team.length);
                chai.assert.equal(res.body.team[0].name, team[0].name);
                chai.assert.equal(res.body.team[1].name, team[1].name);
                done();
              });
          });
      });
  });

  it('should register the pokedex number', (done) => {
    const pokemonName = 'Bulbasaur';
    chai
      .request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Luis Perugachi', password: '1234' })
      .end((err, res) => {
        const token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai
          .request(app)
          .post('/teams/pokemons')
          .send({ pokemonName })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 201);
            chai
              .request(app)
              .get('/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                // Tiene equipo con charizard y blastoise
                // {trainer: Luis Perugachi, team: {pokemon}}
                chai.assert.equal(res.statusCode, 200);
                chai.assert.equal(res.body.trainer, 'Luis Perugachi');
                chai.assert.equal(res.body.team.length, 1);
                chai.assert.equal(res.body.team[0].name, pokemonName);
                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                done();
              });
          });
      });
  });

  it('should delete the pokemon given', (done) => {
    const pokemonName = 'Bulbasaur';
    chai
      .request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Luis Perugachi', password: '1234' })
      .end((err, res) => {
        const token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai
          .request(app)
          .post('/teams/pokemons')
          .send({ pokemonName })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 201);
            chai
              .request(app)
              .get('/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                const { pokedexNumber } = res.body.team[0];
                chai
                  .request(app)
                  .delete(`/teams/pokemons/${pokedexNumber}`)
                  .set('Authorization', `JWT ${token}`)
                  .end((err, res) => {
                    chai.assert.equal(res.statusCode, 200);
                    chai
                      .request(app)
                      .get('/teams')
                      .set('Authorization', `JWT ${token}`)
                      .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                      });
                  });
              });
          });
      });
  });

  it('should not be able to add pokemon if you already have 6', (done) => {
    const team = [
      { name: 'Charizard' },
      { name: 'Blastoise' },
      { name: 'Pikachu' },
      { name: 'Charizard' },
      { name: 'Blastoise' },
      { name: 'Pikachu' },
    ];

    chai
      .request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Luis Perugachi', password: '1234' })
      .end((err, res) => {
        let token = res.body.token;
        chai.assert.equal(res.statusCode, 200);
        chai
          .request(app)
          .put('/teams')
          .send({ team })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.assert(res.statusCode, 201);

            chai
              .request(app)
              .post('/teams/pokemons')
              .send({ pokemonName: 'Vibrava' })
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
              });
          });
      });
  });
});
