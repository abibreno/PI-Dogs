import axios from "axios";

export const GET_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAIL = "GET_DOG_ID";
export const GET_BY_BREED = "GET_BY_BREED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY = "ORDER_BY";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const CREATE_DOG = "CREATE_DOG";
export const FILTER_BY_BREED = "FILTER_BY_BREAD";
export const CLEAN = "CLEAN";

export function getDogs() {
    return async function (dispatch) {
    try {
        let json = await axios.get("https://localhost:3001/dogs");
        return dispatch({
            type: GET_DOGS,
            payload: json.data,
        });
    } catch (error) {
        alert (error)
        }
    }
};

export function getDogByDetail(id) {
    return async function (dispatch) {
    try {
        let json = await axios.get(`https://localhost:3001/dogs/${id}`);
        return dispatch({
            type: GET_DOG_DETAIL,
            payload: json.data[0] || json.data, //renderiza.
        });
    }catch (error) {
        alert (error)
     }
    }
};

export function getTemperaments () {
    return async function (dispatch){
        let json = await axios.get("https://localhost:3001/temperaments", {});
        return dispatch({
            type: GET_TEMPERAMENT,
            payload: json.data,
        });
    }
};

export function getDogByBreed (payload) {
    return async function (dispatch) {
        try{
            let json = await axios.get(`https://localhost:3001/dogs?name=${payload}`);
            return dispatch({
                type: GET_BY_BREED,
                payload: json.data,
            });
        }catch (error){
            alert("Breed not found");
        }
    }
};

export function orderByName (payload) {
    return{
        type: ORDER_BY_NAME,
        payload
    }
};

export function orderBy (payload) {
    return {
        type: ORDER_BY,
        payload
    }
};

export function filterBytemperaments (payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload
    }
};

export function filterByBread (payload) {
    return {
        type: FILTER_BY_BREED,
        payload
    }
};

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
        type: CLEAN,
    }
}