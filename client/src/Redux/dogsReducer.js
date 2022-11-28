import { GET_DOGS, GET_BY_BREED, GET_DOGS_DETAILS, ORDER_BY, FILTER_BY_TEMPERAMENTS, GET_TEMPERAMENTS, FILTER_BY_BREED, CREATE_DOG, CLEAN } from "./dogsActions"

const initialState = {
    dogs : [],
    filtered : [],
    dogsDetails: [],
    temperaments: []
}

export default function reducer(state = initialState, action) {

    switch(action.type){
case GET_DOGS:
      return{
        ...state,
        dogs: action.payload, // esto es lo que me devuelve la action
        filtered: action.payload
      }
      
case GET_BY_BREED:
    return{
        ...state,
        dogs: action.payload
    }
    case GET_TEMPERAMENTS:
        return {
            ...state,
            temperaments : action.payload
        }
        
        case GET_DOGS_DETAILS:
            return{
                ...state,
                dogsDetails: action.payload
            }
            case CLEAN:
                return {
                    ...state,
                    dogsDetails: [],
                }
            
            case ORDER_BY:
                if (action.payload === "default"){ // si el payload es default, entonces que me devuelva el estado inicial
                    return {
                ...state,
                dogs: state.dogs // esto es lo que me devuelve la action
            }
        }
    if (action.payload === "az") { // si el payload es az, entonces que me devuelva el estado inicial
        return {
            ...state,
            dogs: state.dogs.sort(function (a, b) { // ordena de la A a la Z
                if (a.name > b.name) { // si el nombre de a es mayor que el de b
                    return 1; // entonces que me devuelva 1 para que se ordene de la A a la Z
                }
                if (b.name > a.name) { // si el nombre de b es mayor que el de a
                    return -1; // tiene que devolver -1  para que se ordene de la Z a la A
                }
                return 0
             }) 
        }
    } 
    if (action.payload === "za"){
      return{
          ...state,
          dogs: state.dogs.sort (function (a, b) {
              if (a.name > b.name) {
                  return -1;
              }
              if (b.name > a.name) {
                  return 1
              }
              return 0;
          }) 
      }
  }
  if(action.payload === "asc" ){
    return {
        ...state,
        dogs: state.dogs.sort (function (a, b) {
         if (a.weight > b.weight) {
             return 1;
         }
         if (b.weight > a.weight) {
             return -1;
         }
         return 0                        
     }) 
    }
}
if(action.payload === "desc"){
    return {
        ...state,
        dogs: state.dogs.sort (function (a, b) {
         if (a.weight > b.weight) {
             return -1;
         }
         if (b.weight> a.weight) {
             return 1
         }
         return 0;
     }) 
   }
}
else{
    return {
        ...state,
    }
}

case FILTER_BY_TEMPERAMENTS:
  const allDogs = state.filtered; // acabo de crear una variable que contiene a todos los perros
  const temperamentFilter = action.payload === 'All' ? allDogs : allDogs.filter((e) => e.temperaments?.includes(action.payload)) // si el payload es igual a all, entonces que me devuelva todos los perros, sino que me devuelva los perros que incluyan el temperament que le estoy pasando por el payload
  return {
      ...state,
      dogs: temperamentFilter, 
           }
// case FILTER_BY_TEMPERAMENTS:
//                       return{

//                          ...state,
//                      filtered: state.dogs.filter(el=> el.temperaments? el.temperaments.includes(action.payload): "hola" ) 
//                        }

case FILTER_BY_BREED:
    if(action.payload === 'created'){
        if( state.filtered.filter((item)=> (typeof item.id) === 'string').length === 0 ){
           return alert('no dog')
        }
        return {
            ...state, 
            dogs: state.filtered?.filter((item)=> (typeof item.id) === 'string')}
        }

    else {
        return {
            ...state, 
            dogs: state.filtered.filter((item)=> (typeof item.id) === 'number')}
        } ;
//   const allBreeds = state.filtered
//   const breedsFilter = action.payload === 'created' ? 
//     allBreeds.filter((e) => e.createdInDataBase) 
//     : action.payload === 'api' ?
//     allBreeds.filter((e) => !e.createdInDataBase) 
//     : action.payload === 'all' &&
//     allBreeds // si el payload es igual a all, entonces que me devuelva todos los perros, sino que me devuelva los perros que incluyan el temperament que le estoy pasando por el payload
//           return {
//              ...state,
//                dogs: breedsFilter,
               
// }
case CREATE_DOG:
    return {
        ...state, // retorna el estado inicial
    }
        default:  // si no es ninguna de las anteriores, entonces que me devuelva el estado inicial
        return {...state}; // aca me devuelve el estado inicial
    }
}

