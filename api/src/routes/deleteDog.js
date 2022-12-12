const { Router } = require("express");
const router = Router();
const { Dogs, Temperament } = require("../db");

router.delete("/dogs/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Dogs.destroy({
        where: {id: id,} //destruye el perro con la id indicada.
      });
    return res.status(200).json("Perro eliminado")
    }catch(error){
        return res.status(400).json(error)
    }
  });

module.exports = router;