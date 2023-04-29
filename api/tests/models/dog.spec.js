const { Dogs, conn } = require('../../src/db.js');
const { expect } = require('chai');

const validDog = {
  name: 'Peter',
  weight: '55',
  height: '50',
  life_span: '10',
  image: 'https://www.freepik.es/fotos/perro'
}
const invalidDog1 = {
  weight: '60',
  height: '65'
}

const invalidDog2 = {
  name: 'Coki',
  weight: '55'
}


describe('Dogs Model', () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
  });
  describe('Validators', () => {
    describe('General', () => {
      it('Should throw an error if name is not sent', async () => {
          try {
            await Dogs.create(invalidDog1);
          } catch (error) {
            expect(error.message).to.be.a('string');
          }
      });
      it('Should throw an error if height is not sent', async () => {
        try {
          await Dogs.create(invalidDog2);
        } catch (error) {
          expect(error.message).to.be.a('string');
        }
      })
      it('Should create the dog if mandatory fields are sent', async () => {
          const dog = await Dogs.create(validDog);
          expect(dog.toJSON()).to.include({name: 'Peter'});
      });
      it('Should automatically set created property to true to every dog created', async () => {
        const dog = await Dogs.create(validDog);
        expect(dog.toJSON()).to.include({created: true});
      });
   
    });
  });
});






