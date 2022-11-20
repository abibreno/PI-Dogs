const { Router } = require("express");
const router = Router();
const { allInfo } = require("./controllers/DogsInfo");
const { getDogs } = require("./controllers/DogsInfo");
const { Dogs, Temperament} = require('../db');
const { Op } = require('sequelize');

router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    try {
      let dogs = await Dogs.findAll({
        include: {
          model: Temperament,
        },
      });
      if (!dogs.length){
        const dogsData = await getDogs();
        await Dogs.bulkCreate(dogsData);
      }

    } catch (err) {
        console.log(err)
    }
    if (name) {
      const dogsName = await Dogs.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` }, //iLike es para que no sea case sensitive
        },
        
      });
      dogsName.length ? res.status (200).send(dogsName) : res.status(404).send('No se encontró el perro')
      
    }else {
      const perros = await Dogs.findAll({
        include: {
          model: Temperament,
        },
      });
      res.status(200).send(perros);
    }     
});
module.exports = router;