const {Dogs, Temperaments} = require ('../db');
const axios = require ('axios');
const { Op } = require('sequelize');
const {API_KEY}=  process.env;

const cleanArray = (arr) =>
   arr.map((elem)=>{
  
    

    
    return{
      id: elem.id,
      name: elem.name,
      height: elem.height.metric!='NaN' ? elem.height.metric : elem.height.imperial,
      weight: elem.weight.metric.includes('NaN') ? "1 - 99" : elem.weight.metric, 
      life_span: elem.life_span,
      image: elem.image?.url,
      temperaments: elem.temperament,
      created:false
    }
  })
  

  const transformedDogs = (arr) => {
    return arr.map(dog => {
      const temperamentNames = dog.Temperaments.map(temp => temp.name);
      const temperamentString = temperamentNames.join(', ');
      const { Temperaments, ...rest } = dog.toJSON(); 
      return { ...rest, temperaments: temperamentString };
    });
  }
  
  const getAllDogs = async () => {
    const dbDogsRaw = await Dogs.findAll({include: {model: Temperaments, attributes: ['name'],  through: { attributes: [] }}});
    const apiDogsRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
  
    const apiDogs = cleanArray(apiDogsRaw);
    const dbDogs = transformedDogs(dbDogsRaw);
  
    return [...dbDogs,...apiDogs];
  }

//* GET | /dogs name : 
const searchDogByName = async (name) => {
  const dbDogsRaw = await Dogs.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Temperaments,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

  const apiDogsRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
  
  const apiDogs = apiDogsRaw.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase())).map((dog) => ({
    id: dog.id,
    name: dog.name,
    image: dog.image?.url,
    temperaments: dog.temperament,
    weight: `${dog.weight.metric} kg`,
    height: `${dog.height.metric} cm`,
    life_span: dog.life_span,
    created: false,
  }));

  const dbDogs = transformedDogs(dbDogsRaw);

  return [...dbDogs, ...apiDogs];
};


//*ID:
const getDogById = async(id)=>{
  let all = await getAllDogs();
  let foundId = all.filter(dog=>dog.id == id );
  return foundId[0];
}

//* POST : 
const createDog = async (name, height_min, height_max, weight_min, weight_max, life_span, image, temperamentId) =>{

  let weight = "";
    if (weight_min && weight_max) weight+=`${weight_min} - ${weight_max}`;
    else if (weight_min) weight+=weight_min;
    else weight+=weight_max;

    let height = "";
    if (height_min && height_max) height+=`${height_min} - ${height_max}`;
    else if (height_min) height+=height_min;
    else height+=height_max;
  
  const dogExists = await Dogs.findOne({where: {name}});
  if(dogExists) throw Error(' The dog breed already exists in the database');

 const newDog = await Dogs.create({name, height, weight, life_span, image});
 await newDog.addTemperaments(temperamentId);

 return newDog;
}

  //* DELETE | /dogs/:id    
  const deleteDog = async(id) => {

    const toDelete= await Dogs.findByPk(id);
    if(!toDelete) return "Dog not found";
    await toDelete.destroy();
    return "Dog successfully deleted";
   }


    

module.exports = {getAllDogs, getDogById, searchDogByName, createDog, deleteDog};

