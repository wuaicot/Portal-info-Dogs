//esta es la principal se definen las rutas de la API que utilizará el cliente para comunicarse con el servidor.
const { Router } = require('express');
const dogsRouter = require ('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');


const router = Router(); 

router.use('/dogs', dogsRouter); 
router.use('/temperaments', temperamentsRouter);


module.exports = router;
