import axios from 'axios';

export const GET_DOGS = "GET_DOGS";
export const GET_DOGS_DETAILS = "GET_DOGS_DETAILS"
export const GET_BY_BREED = "GET_BY_BREED";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET"
export const ORDER_BY = "ORDER_BY"
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const FILTER_BY_BREED = "FILTER_BY_BREED"
export const CREATE_DOG = "CREATE_DOG"
export const CLEAN = "CLEAN"


export function getDogs () {
return async function (dispatch) {
    try {
        var json = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: GET_DOGS,
            payload: json.data,
        })
    } catch (error) {
       alert(error)
    }
}
}

export function getTemperaments (){
    return async function (dispatch){
        var json = await axios("http://localhost:3001/temperaments", {}); // esto devuelve un array de temperamentos
        return dispatch ({
            type: GET_TEMPERAMENTS, // esto es lo que me devuelve la action
            payload: json.data // esto es lo que me devuelve la action
        })
    }
};

export function getDogsDetails(id) {
    return async function (dispatch) {
     try{ 
        var json = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
           type: GET_DOGS_DETAILS, 
           payload: json.data[0] || json.data
           })
        } catch (error) {
            alert(error)
        }
    };
  }


export function getDogByBreed (payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${payload}`) //esto lo que hace es buscar por nombre
        return dispatch({
            type: GET_BY_BREED,
            payload: json.data
        })
        } catch (error) {
            alert('Breed not found')
        }
    }
}

export function orderBy (payload) { 
        return {
            type: ORDER_BY, 
            payload
        }
}

export function filterByTemperaments (payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload //payload es un array de temperamentos
    }
}

export function filterByBreed (payload) {
    return {
        type: FILTER_BY_BREED,
        payload
    }
}

export function createDog (payload) {
    return async function(dispatch){ 
        try{
            await axios.post('http://localhost:3001/dogs', payload);
            return {
                type: CREATE_DOG,
                }
            } 
        catch(error){
              alert("Post failed")
            }
        } 
}

export function clean () {
    return {
        type: CLEAN
    }
}