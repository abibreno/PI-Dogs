const { Router } = require("express");
const router = Router();
const { Dogs, Temperament } = require("../db");

router.post("/dogs", async (req, res) => {
  let { name, life_span, weight, height, image, temperament } = req.body;

  const capitalizar = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  try {
    const dogCREATED = await Dogs.findOrCreate({
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
