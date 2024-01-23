const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../app').app;

const { cleanUpUsers, registerUser } = require('../users-controllers');
const { cleanUpTeam } = require('../../teams/teams-controllers');

beforeEach(async () => {
	await registerUser('Luis Perugachi', '1234');
	await registerUser('Test', '1234');
});

afterEach(async () => {
	await cleanUpTeam();
	await cleanUpUsers();
});

describe('Suite de pruebas auth', () => {
	it('It should return 401 when no jwt token available', done => {
		chai
			.request(app)
			.get('/teams')
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 401);
				done();
			});
	});

	it('It should return 400 when no data is provided', done => {
		chai
			.request(app)
			.post('/auth/login')
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 400);
				done();
			});
	});

	it('It should return 200 and token for succesful login', done => {
		chai
			.request(app)
			.post('/auth/login')
			.set('content-type', 'application/json')
			.send({ user: 'Test', password: '1234' })
			.end((err, res) => {
				chai.assert.equal(res.statusCode, 200);
				done();
			});
	});

	it('It should return 200 when jwt is valid.', done => {
		chai
			.request(app)
			.post('/auth/login')
			.set('content-type', 'application/json')
			.send({ user: 'Luis Perugachi', password: '1234' })
			.end((err, res) => {
				chai
					.request(app)
					.get('/teams')
					.set('Authorization', `JWT ${res.body.token}`)
					.end((err, res) => {
						chai.assert.equal(res.statusCode, 200);
						done();
					});
			});
	});
});

// after(async () => {
//   await cleanUpUsers();
// });
