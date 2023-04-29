const {getTemperaments} = require ('../controllers/temperamentsControllers');


const getTemperamentsHandler =  async (req,res)=> {
    try{
      const Alltemperaments = await getTemperaments();
      res.status(200).json(Alltemperaments);
    }catch(error){
      res.status(400).json({ error: error.message });
    }
   }

   module.exports = {getTemperamentsHandler};