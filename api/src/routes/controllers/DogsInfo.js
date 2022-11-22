const axios = require('axios');
const { Dogs, Temperament} = require('../../db');
const API = 'https://api.thedogapi.com/v1/breeds'


const getDogs = async() => {
  try{
      const allDogs = await axios.get('https://api.thedogapi.com/v1/breeds');


          const perros = await allDogs.data.map((e) => {
              return{
                id: e.id,
                name: e.name,
                image: e.image.url,
                life_span: e.life_span,
                min_weight: parseInt(e.weight.metric.split('-')[0]) ? parseInt(e.weight.metric.split('-')[0]) : 0,
                max_weight: parseInt(e.weight.metric.split('-')[1]) ? parseInt(e.weight.metric.split('-')[1]) : 0,
                min_height: parseInt(e.height.metric.split('-')[0]) ? parseInt(e.height.metric.split('-')[0]) : 0,
                max_height: parseInt(e.height.metric.split('-')[1]) ? parseInt(e.height.metric.split('-')[1]) : 0,




              }

          }

      );

      return perros;

  } catch (err) {
      console.log(err)
  }
};
const dogss = async () => {
const dbDogs = await Dogs.findAll({
  include: {model: Temperament,
   attributes: ['name', 'id',],
   through: { atributes: []}
} 
});
return dbDogs;
}


const allInfo = async () => {
  const apiInfo = await getDogs()
  const  dbInfo = await dogss()
   const infoTotal = [...dbInfo, ...apiInfo]
   return infoTotal;
}


module.exports = {
  getDogs, allInfo , dogss,
};