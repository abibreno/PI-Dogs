const {Router} = require('express');
const router = Router();
const {Dogs, Temperament} = require('../db')

router.post('/dogs', async (req, res) => {
    const {name, life_span, min_weight, max_weight, min_height, max_height, image, temperament} = req.body;
    try { 
        const dog = await Dogs.create({
             name,
             min_weight,
             max_weight,
             min_height,
             max_height,
             life_span,
             image
        })
        const temperamentDB = await Temperament.findAll({
            where: {
                name: temperament,
            }
        })
        dog.addTemperament(temperamentDB) 
        res.send(dog) 
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;