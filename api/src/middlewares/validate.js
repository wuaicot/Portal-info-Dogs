const validate = (req, res, next) =>{
    const {name,height_min, height_max, weight_min, weight_max,life_span} = req.body;
    if (!name || (!height_min && !height_max) || (!weight_min && !weight_max) || !life_span ) return res.status(400).json({ error: 'Missing required fields'});
    next(); 
  }

  module.exports = {validate}