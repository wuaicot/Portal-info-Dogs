const {getTemperaments} = require ('../controllers/temperamentsControllers');

 //obtenemos todos los temperamentos disponibles en la base de datos y enviamos como respuesta al cliente.
const getTemperamentsHandler =  async (req,res)=> {
    try{
      const Alltemperaments = await getTemperaments();
      res.status(200).json(Alltemperaments);
       //manejamos error
    }catch(error){
      res.status(400).json({ error: error.message });
    }
   }

   module.exports = {getTemperamentsHandler};