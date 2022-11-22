const { Router } = require('express');
const { Dogs, Temperament } = require('../db');
const { getDogs } = require('./controllers/DogsInfo');
const router = Router();

router.get('/dogs/:id', async (req, res) => {
   
   const { id } = req.params;
       if(id.includes('-')){
           let dogsId = await Dogs.findOne({
           where: {
            id: id,
        },
         include: Temperament, 
        })
        dogsId? res.status(200).send(dogsId) : res.status(404).send('Dog not found')
    } else {
    let dogsAPI = await getDogs();
    let dogsAPIfiltered = dogsAPI.filter((e) => e.id == id)
    dogsAPIfiltered? res.status(200).send(dogsAPIfiltered) : res.status(404).send("Dog's ID has not been found")
    }
})

module.exports = router;