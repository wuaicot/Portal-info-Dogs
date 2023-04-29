const {Temperaments} = require ('../db');
const axios = require ('axios');
const {API_KEY} = process.env;

  //* GET | /temperaments:
    const saveNewTemperaments = async () => {
    try {
      const data = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
      const temperaments = [];
      
      data.forEach(breed => {
        const breedTemperaments = breed.temperament?.split(', ');
        if (breedTemperaments) {
          breedTemperaments.forEach(temp => {
            if (!temperaments.includes(temp)) {
              temperaments.push(temp);
            }
          });
        }
      });
  
      const newTemperaments = temperaments.map((name) => ({ name }));
      await Temperaments.bulkCreate(newTemperaments);
  
    } catch (error) {
      console.log(error);
    }
  };

  const getTemperaments = async() => {
    try {
        const dbTemperaments = await Temperaments.findAll({
           attributes: ['id', 'name'],
        });
        if (dbTemperaments.length) {
          return dbTemperaments;
        } else {
          await saveNewTemperaments();
          const allTemperaments = await Temperaments.findAll({
            attributes: ['id', 'name'],
          });
          return allTemperaments;
        }
      } catch (error) {
        console.log(error);
      }
    };




  module.exports = {getTemperaments};
