const { Router} = require("express");
const { Temperament} = require("../db");
const router = Router();
const axios = require("axios");
const api = 'https://api.thedogapi.com/v1/breeds';

router.get("/temperaments", async (req, res) => {
    try{
        const temperamentDB = await Temperament.findAll(); //me traigo todos de la bd.
        if(temperamentDB >= 1) res.send(temperamentDB)

        const apiInfo = await axios.get(api) //voy a la api si no hay en la bd.
        let temperamentAll = apiInfo.data?.map(dog => dog.temperament ? dog.temperament : null).map(dog => dog && dog.split(", "));
        const dogSet = new Set(temperamentAll); //no los repite
        let temperamentToDB = dogSet.forEach((t) => {
            if(t){
                Temperament.findOrCreate({ //no vuelve a guardar el mismo temp.
                    where: {name: t }
                })
            }
        })
        temperamentToDB = await Temperament.findAll();
        res.status(200).send(temperamentToDB)
        } catch (error) {
            res.status(404).send('Temperament not found')
        }
})

module.exports = router;