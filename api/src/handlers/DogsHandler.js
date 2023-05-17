const {getDogById, createDog, getAllDogs, searchDogByName, deleteDog} = require ('../controllers/dogsControllers');

//* REQ - RES: 
//* ALL and NAME :manejamos la GET para obtener todos los perros o buscar por nombre Dependiendo de la presencia del parámetro name en la solicitud
const getDogsHandler = async (req,res)=>{
    try {
      const {name} = req.query;
      //se llama a la funcion para obtener por nombre
      const results = name ? await         
        searchDogByName(name) : await
        ////se llama a la fincion para busca todo los perros
         getAllDogs();
        
         //devolvemos una respuesta segun el caso
        res.status(200).json(results);
     
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };  



//*ID : obtenemos un perro especifico por ID 
const getDogHandler = async (req,res)=>{
    const {id} = req.params;
    try{
       //devolvemos una respuesta 200 y el perro obtenido en un formato JSON o 400
      const dog = await getDogById(id);
      res.status(200).json(dog);
       //tomamos el manejo de error y devolvemos un objeto
    }catch(error){
      res.status(400).json({ error: error.message })
    }
}



  //*POST : creamos un nuevo perro. Obtenemos los parámetros necesarios del boddy de la req
  const createDogHandler = async (req,res) => { 
    console.log('Recibida solicitud para crear un nuevo perro:', req.body);

    const {name, height_min, height_max, weight_min, weight_max, life_span, image, temperamentId} = req.body;
    try{
       //crea un nuevo perro en la bdd
      const newDog = await createDog(name,height_min, height_max, weight_min, weight_max, life_span, image, temperamentId);       
      res.status(201).json(newDog);
      //devuelve un JSON o un mensaje de error
    }catch(error){
      res.status(400).json({ error: error.message });
    }
  }

  //*DELETE: eliminamos un perro espesifico por su id
  const deleteDogHandler = async (req,res)=>{
    try{
       //obtenemos el parametro id que viene q viene en la solicitud
      const {id} = req.params;
       //eliminamos el perro correspondiente de la base de datos
      const deleted = await deleteDog(id);
      //devolvemos una respuesta 200 o 400
      res.status(200).json(deleted);
    }catch(error){
      res.status(400).json({error: error.message})
    }
  }
 
    // exportamos las funciones handlers
  module.exports = {getDogsHandler, getDogHandler, createDogHandler, deleteDogHandler};