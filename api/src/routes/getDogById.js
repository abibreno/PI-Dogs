const { Router } = require("express");
const { Dogs, Temperament } = require("../db");
const router = Router();
const axios = require("axios");

router.get("/dogs/:idRaza", async (req, res) => {
  const { idRaza } = req.params;

  if (idRaza.includes("-")) {
    let dogDB = await Dogs.findOne({
      where: {
        id: idRaza,
      },
      include: Temperament,
    });
    dogDB = JSON.stringify(dogDB);
    dogDB = JSON.parse(dogDB);

    //dejo un array con los nombres de temp solamente
    dogDB.temperaments = dogDB.temperaments.map((d) => d.name + ", ");
    res.json(dogDB);
  } else {
    try {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${idRaza}`
      );

      let {
        id,
        name,
        weight,
        height,
        life_span,
        temperament,
        reference_image_id,
        breed_group,
      } = response.data;

      //CONVIERTO TODO A JSON CON SOLAMENTE LOS CAMPOS QUE ME PIDIERON Y LO RETORNO
      return res.json({
        id,
        name,
        weight: weight.metric,
        height: height.metric,
        life_span,
        temperaments: temperament,
        breed_group,
        image: `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`,
      });
    } catch (err) {
      res.sendStatus(500);
      throw new Error("error");
    }
  }
});

module.exports = router;
