const axios = require("axios");
const { Dogs, Temperament } = require("../../db");

const getDogs = async () => {

  const conv = (data) => {
    if (data) return data.split(", ");
  };
  
  try {
    const allDogs = await axios.get("https://api.thedogapi.com/v1/breeds");

    const perros = await allDogs.data.map((d) => { //El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
      return {
        id: d.id,
        name: d.name,
        image: d.image.url,
        temperaments: conv(d.temperament),
        height: d.height.metric,
        weight: d.weight.metric,
        life_span: d.life_span,
      };
    });
    return perros;
  } catch (err) {
    console.log(err);
  }
};
const dogss = async () => {
  let dogsDB1 = await Dogs.findAll({
    //aca creo un arreglo con todos los registros de la tabla dog
    include: Temperament, //de la tabla temperaments para que funcione la vinculacion y la asignacion de los temperaments.
  });

  dogsDB1 = JSON.stringify(dogsDB1);//convierte un objeto o valor de JavaScript en una cadena de texto JSON
  dogsDB1 = JSON.parse(dogsDB1); //// obtengo un json del arreglo donde aloje todos los dogs con sus temperamentos
  //analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis.

  //abajo itero sobre todos los registros de dogs para poder asiganrle a cada dogs los temperamentos correspondientes eso lo hago
  //mediante el reduce y el concat y mediante el map mapeo el arreglo temperamentos para extraer el nombre de cada temperamento.
  dogsDB1 = dogsDB1.reduce(//ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor.
    (acc, el) =>
      acc.concat({
        ...el,
        temperaments: el.temperaments.map((g) => g.name), //Me quedo solo con el nombre de cada temperaments
      }),
    []
  ); //
  return dogsDB1;
};

const allInfo = async () => {
  const apiInfo = await getDogs();
  const dbInfo = await dogss();
  const infoTotal = [...dbInfo, ...apiInfo];
  return infoTotal;
};

module.exports = {
  getDogs,
  allInfo,
  dogss,
};
