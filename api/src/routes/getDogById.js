const { Router} = require("express");
const { Dogs, Temperament} = require("../db");
const router = Router();
const { getApiInfo } = require('./controllers/DogsInfo');


// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados

router.get("/dogs/:id", async (req, res) => {
    const {id} = req.params;
    if(id.includes("-")){ //identifica si es Id de api o bd.
        let dogsId = await Dogs.findOne({ //Trae solo un objeto
            where:{
                id:id,
            },
            include: Temperament,
        })
        dogsId?res.status(200).send(dogsId) : res.status(404).send('Dog not found');
    }else{
        let dogsApi = await getApiInfo(); //trae la info de la api.
        let dogsApiFilter = dogsApi.filter((e) => e.id == id)
        dogsApiFilter?res.status(200).send(dogsApiFilter) : res.status(404).send('Dogs id not found');
    }
  })

  module.exports = router;