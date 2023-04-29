/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dogs, conn } = require('../../src/db.js');

const agent = session(app);
const dog1 = {
  name: 'Peter',
  weight: '55',
  height: '50',
  life_span: '10',
  image: 'https://www.freepik.es/fotos/perro'
};

const dog2 = {
  name: 'Flori',
  height: '40',
  weight: '50',
  life_span: '10',
  image: 'https://www.freepik.es/fotos/perro'
};

const dog3 = {
  name: 'Drako',
  height: '50',
  weight: '60',
  life_span: '10',
  image: 'https://www.freepik.es/fotos/perro'
};

const dog4 = {
  name: 'Phill',
  height: '50',
  
};


describe('Dog routes ------ GET -----', () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });
    describe('GET /', () => {
    it('responds with 200', () => agent.get('/dogs').expect(200));
    it('responds with an array', () =>
      agent.get('/dogs').then((res) => {
          expect(res.body).to.be.an('array');
      }));
    it('includes all breeds from the API on the response', () =>
      agent.get('/dogs').then((res) => {
          expect(res.body).to.have.lengthOf(172);
      }));
    it('includes breeds created by users in the response', async () => {
        await Dogs.create(dog1);
        let res = await agent.get('/dogs');
        expect(res.body).to.have.lengthOf(173);
    })
    it('responds with details of a specific breed when name is passed by query', async () => {
        await Dogs.create(dog2);
        let res = await agent.get('/dogs?name=Flori');
        expect(res.status).to.equal(200);
      });
    })
  })


  describe('Dog routes ------ POST -----', () => {
        it('responds with 200 when a valid dog is passed', async () => {
          agent.post('/dogs',dog3).then((res) => {
            expect(res.status).to.be(200)
          })
        })
        it('responds with 404 when not all mandatory fields are passed', async () => {
          agent.post('/dogs',dog4).then((res) => {
            expect(res).to.be(200)
          })
        })
  });
