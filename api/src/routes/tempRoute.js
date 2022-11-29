const { Router } = require("express");
const router = Router();
const axios = require("axios");
const api = "https://api.thedogapi.com/v1/breeds";
const { Temperament } = require("../db");

router.get("/temperaments", async (req, res) => {
  try {
    const temperamentsFromDB = await Temperament.findAll();
    if (temperamentsFromDB >= 1) res.json(temperamentsFromDB);

    const apiInfo = await axios.get(api);
    let everyTemperament = apiInfo.data
      ?.map((dog) => (dog.temperament ? dog.temperament : null))
      .map((dog) => dog && dog.split(", ")); //
    const mySet = [...new Set(everyTemperament.flat())]; // Set es un objeto que contiene valores únicos
    let temperamentsToDB = mySet.forEach((t) => {
      if (t) {
        Temperament.findOrCreate({
          where: { name: t },
        });
      }
    });
    temperamentsToDB = await Temperament.findAll();
    res.status(200).json(temperamentsToDB);
  } catch (error) {
    res.status(404).send("No temperaments found");
  }
});

module.exports = router;
