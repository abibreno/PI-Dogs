const axios = require('axios');
const { Dogs, Temperament} = require('../../db');
const API = 'https://api.thedogapi.com/v1/breeds'

const dogsDBinfo = async ()=>{
   try{
     let allInDB = await Dogs.findAll({
       include: [Temperament],
     });
     console.log("dogsDbInfo:", allInDB)
     let dogsDB = allInDB.map((dog) => {
       let allTemperaments = dog.temperaments?.map((temp) => temp.name);
       return {
         id: dog.id,
         name: dog.name,
         min_height: dog.min_height,
         max_height: dog.max_height,
         min_weight: dog.min_weight,
         max_weight: dog.max_weight,
         life_span: dog.life_span,
         temperament: allTemperaments,
         image: dog.image,
       };
     });
     return dogsDB;
   }catch (error) {
     console.log(error);
   }
}


const getApiInfo = async () => {
   const apiInfo = await axios.get(API)





   const allDogs = apiInfo.data.map((e) => {
      return{
      id: e.id,
      name: e.name,
      min_weight: Number(e.weight.metric.slice(0,2)), 
      max_weight: Number(e.weight.metric.slice(4)), 
      min_height: Number(e.height.metric.slice(0,2)),
      max_height: Number(e.height.metric.slice(4)),
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url
      }
  })
  
  return allDogs;
}

const allInfo = async () => {
   apiInfo = await getApiInfo()
   dbInfo = await dogsDBinfo()
   const infoTotal = [...dbInfo, ...apiInfo]
   return infoTotal;
}


module.exports = {
   allInfo, getApiInfo, dogsDBinfo, 
}; 