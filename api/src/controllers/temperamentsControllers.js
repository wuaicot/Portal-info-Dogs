const {Temperaments} = require ('../db');
const axios = require ('axios');
const {API_KEY} = process.env;

  //* GET | /temperaments: llamamos a la API para obtener información sobre las razas de perros y sus temperamentos asociados
    const saveNewTemperaments = async () => {
    try {
      const data = (await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
        //creamos lista de los diferentes temperamentos
      const temperaments = [];
      //iteramos en cad raza y verificamos si la propiedad temperament existe en el objeto de la raza y si es así, se divide el valor de la propiedad temperament en una lista de temperamentos mediante la cadena split()
      data.forEach(breed => {
        const breedTemperaments = breed.temperament?.split(', ');
        if (breedTemperaments) {
           // iteramos en cada uno de temperamentos y verificamos si ya existe en la lista de temperamentos registrados en la base de datos. Si no existe  se agrega a la lista temperaments
          breedTemperaments.forEach(temp => {
            if (!temperaments.includes(temp)) {
              temperaments.push(temp);
            }
          });
        }
      });
      //creamos nuevos registros de temperamentos en la tabla de la base de datos con los nombres de los temperamentos recuperados de la API.
      const newTemperaments = temperaments.map((name) => ({ name }));
      await Temperaments.bulkCreate(newTemperaments);
  
    } catch (error) {
      console.log(error);
    }
  };


       //busca todos los temperamentos existentes en la base de datos usando el modelo Temperaments y los devuelve como una lista de objetos JSON.
  const getTemperaments = async() => {
    try {
        const dbTemperaments = await Temperaments.findAll({
           attributes: ['id', 'name'],
        });
          //Si la lista está vacía, significa que no hay datos en la base de datos y, por lo tanto, llama a la función  para obtener los datos de la API y guardarlos en la base de datos antes de devolverlos.
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
