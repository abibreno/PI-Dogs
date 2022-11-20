import {
    GET_DOGS,
    GET_DOG_DETAIL,
    GET_BY_BREED,
    ORDER_BY,
    FILTER_BY_TEMPERAMENTS,
    GET_TEMPERAMENT,
    CREATE_DOG,
    FILTER_BY_BREED,
    CLEAN,
} from "../Actions/dogsActions";

const initialState = {
    dogs: [],
    dogDetail: [],
    filtered: [],
    temperaments: []
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filtered: action.payload
            };

        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload,
            };
        case GET_BY_BREED:
            return {
                ...state,
                dogs: action.payload,
            };
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            };
        case CLEAN:
            return {
                ...state,
                dogDetail: [],
            };
        case ORDER_BY:
            if(action.payload === "default"){
                return{
                    ...state,
                    dogs: state.dogs,
                }
            }
            if(action.payload === "az"){
                return{
                    ...state,
                    dogs: state.dogs.sort(function(a,b){ //ordena de a-z
                        if(a.name > b.name){
                            return 1
                        } if(b.name > a.name){
                            return -1
                        }return 0
                    })
                }
            }
            if(action.payload === "za"){
                return{
                    ...state,
                    dogs: state.dogs.sort(function(a,b){
                        if(a.name > b.name){
                            return -1
                        } if(b.name > a.name){
                            return 1
                        }return 0
                    })
                }
            }
            if(action.payload === "asc"){
                return{
                    ...state,
                    dogs: state.dogs.sort(function(a,b){
                        if(a.max_weight > b.max_weight){
                            return 1
                        } if(b.max_weight > a.max_weight){
                            return -1
                        }return 0
                    })
                }
            }
            if(action.payload === "des"){
                return{
                    ...state,
                    dogs: state.dogs.sort(function(a,b){
                        if(a.max_weight > b.max_weight){
                            return -1
                        } if(b.max_weight > a.max_weight){
                            return 1
                        }return 0
                    })
                }
            }
            else {
                return {
                    ...state,
                }
            }
        case FILTER_BY_TEMPERAMENTS:
            const filterAllDogs = state.filtered;
            const filterTemperament = action.payload === "All" ? filterAllDogs : filterAllDogs.filter((e) => e.temperament?.includes(action.payload))
            return{
                ...state,
                dogs: filterTemperament,
            }
        case FILTER_BY_BREED:
            const filterAllBreeds = state.filtered;
            const filterBreed = action.payload === "Created" ? filterAllBreeds.filter((e) => createDb) : action.payload === "Api" ? filterAllBreeds.filter((e) => !e.createDb) : action.payload === "All" && filterAllBreeds
            return{
                ...state,
                dogs: filterBreed,
            }
        case CREATE_DOG:
            return{
                ...state,
            }
            default:
                return state;
    }
};
