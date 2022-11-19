const { Router} = require("express");
const { Dogs, Temperament} = require("../db");
const { dogsDBinfo } = require("./controllers/DogsInfo");
const router = Router();

// [ ] POST /dogs:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos relacionada con sus temperamentos

router.post("/dogs", async (req, res) => {
    const {name, life_span, min_weight, max_weight, min_height, max_height, image, temperament} = req.body; //traigo de mi modelo.
    try{
        const newDog = await Dogs.create({ //propiedades que quiero que tenga el perro.
            name,
            life_span,
            min_weight,
            max_weight,
            min_height,
            max_height,
            image
        })
        const tempDb = await Temperament.findAll({ //trigo los temp de la bd.
            where: {
                name: temperament,
            }
        })
        newDog.addTemperament(tempDb) //agrego el temperamento al nuevo perro.
        res.send(newDog)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;