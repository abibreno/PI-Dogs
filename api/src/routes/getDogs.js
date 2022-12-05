const { Router } = require("express");
const router = Router();
const { allInfo } = require("./controllers/DogsInfo");

router.get("/dogs", async (req, res) => {
  if (req.query.name) {
    let { name } = req.query;
    const dogs = await allInfo();
    const result = dogs.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );

    if (result.length >= 1) {
      res.status(200).json(result);
    } else {
      res.status(400).json("no dogs try again");
    }
  } else {
    try {
      let total = await allInfo();
      res.status(200).json(total);
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

module.exports = router;
