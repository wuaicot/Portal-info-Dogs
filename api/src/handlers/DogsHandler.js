const {getDogById, createDog, getAllDogs, searchDogByName, deleteDog} = require ('../controllers/dogsControllers');

//* REQ - RES: 
//* ALL and NAME :
const getDogsHandler = async (req,res)=>{
    try {
      const {name} = req.query;
      const results = name ? await searchDogByName(name) : await getAllDogs();
      
        res.status(200).json(results);
     
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
//*ID :
const getDogHandler = async (req,res)=>{
    const {id} = req.params;
    try{
      const dog = await getDogById(id);
      res.status(200).json(dog);
    }catch(error){
      res.status(400).json({ error: error.message })
    }
}

  //*POST :
  const createDogHandler = async (req,res) => { 
    const {name, height_min, height_max, weight_min, weight_max, life_span, image, temperamentId} = req.body;
    try{
      const newDog = await createDog(name,height_min, height_max, weight_min, weight_max, life_span, image, temperamentId);
      res.status(201).json(newDog);
    }catch(error){
      res.status(400).json({ error: error.message });
    }
  }

  //*DELETE: 
  const deleteDogHandler = async (req,res)=>{
    try{
      const {id} = req.params;
      const deleted = await deleteDog(id);
      res.status(200).json(deleted);
    }catch(error){
      res.status(400).json({error: error.message})
    }
  }
 

  module.exports = {getDogsHandler, getDogHandler, createDogHandler, deleteDogHandler};