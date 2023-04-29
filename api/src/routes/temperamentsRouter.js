
const { Router } = require('express');
const router = Router();
const {getTemperamentsHandler} = require ('../handlers/TemperamentsHandler');


//* GET | /temperaments:
router.get('/', getTemperamentsHandler);



module.exports = router;