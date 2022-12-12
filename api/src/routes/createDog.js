const { Router } = require("express");
const router = Router();
const { Dogs, Temperament } = require("../db");

router.post("/dogs", async (req, res) => {
  let { name, life_span, weight, height, image, temperament } = req.body;

  const capitalizar = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1); //devuelve en un nuevo String el carácter UTF-16 de una cadena. El toUpperCase() método devuelve el valor convertido en mayúsculas de la cadena que realiza la llamada.
  };

  try {
    const dogCREATED = await Dogs.findOrCreate({//findOrCreate() es un método de consulta que intenta buscar una entrada en la tabla o crear una nueva entrada cuando no se encuentra nada.
      //devuelvo un array (OJOOO!!!!)
      where: {
        name: capitalizar(name),
        weight,
        height,
        life_span,
        image: image,
      },
    });
    await dogCREATED[0].setTemperaments(temperament); // relaciono ID temperaments al dog creado
    
    res.status(200).json(dogCREATED);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
