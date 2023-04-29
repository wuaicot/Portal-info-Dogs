
const { Router } = require('express');
const router = Router();
const {getDogsHandler, getDogHandler, createDogHandler, deleteDogHandler} = require ('../handlers/DogsHandler');
const {validate} = require('../middlewares/validate');


//* GET | /dogs: y ?name: 
router.get('/', getDogsHandler);
 //* GET | /dogs/:id
router.get('/:id', getDogHandler);
 //* POST | /dogs:
router.post('/', validate ,createDogHandler);
 //* DELETE | /dogs:
router.delete('/:id', deleteDogHandler);

  
    


     module.exports = router;