import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getDogs, orderBy, filterByTemperaments, getTemperaments, filterByBreed} from "../Redux/dogsActions";
import "./Home.css";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import loading from "../Fotos/otrafoto.jpg"


export default function Home(){

    const dispatch = useDispatch(); //Para poder usar las acciones.
    const allDogs = useSelector((state) => state.dogs); //para poder usar el estado.
    const temperaments = useSelector((state) => state.temperaments); //usar estado.
    const [, setOrder] = useState("All"); //ordenamiento.
    const [, setBreeds] = useState("All"); //ordenamiento.

    const [currentPage, setCurrentPage] = useState(1); //la pagina empieza en 1
    const [dogPerPage] = useState(8); //8xpagina.
    const indexOfLastDog = currentPage * dogPerPage; //ultimo perro.
    const indexFirstDog = indexOfLastDog - dogPerPage; //calcula 1er perro.
    const currentDogs = allDogs.slice(indexFirstDog, indexOfLastDog); //calcula perros x pagina.
    const [temperament, setTemperament] = useState("All"); // filtro por temperamento.

    const pagination = (currentPageNumber) => {
        setCurrentPage(currentPageNumber) //actualiza la pagina cuando cambia.
    };


    useEffect(() => { //cuando renderiza ejecuta la accion.
        setCurrentPage(1)
    }, [allDogs]) //estado, se ejecuta cunado cambia de page.

    useEffect(() => {
        dispatch(getDogs()) //traigo todos los perros.
        dispatch(filterByTemperaments()) //filtra temperamentos.
        dispatch(getTemperaments()) //trae temperamentos.
    }, [dispatch]) //se ejecuta cuando cambia.



    function handleClick (e){
        e.preventDefault(); //espera que despache la accion
        dispatch(getDogs());
    }

    function handleSort (e){ //funcion para ordernar.
        e.preventDefault();
        dispatch(orderBy(e.target.value)) //uso action para ordenar.
        setCurrentPage(1) //actuliza pagina.
        setOrder(e.target.value) //actualiza el estado.
    }

    function handleFilterByTemp (e) { //funcion filtra por temp.
        e.preventDefault();
        dispatch(filterByTemperaments(e.target.value))
        setCurrentPage(1)
        setTemperament(e.target.value)
    }

    function handleFilterByBreed (e) { //filtra x raza.
        e.preventDefault();
        dispatch(filterByBreed(e.target.value))
        setCurrentPage(1)
        setBreeds(e.target.value)
    }


    return(

        <div className="homeDiv">
            <div className="welcome">
            <h1> 🐕 Welcome 🐕 </h1>
            </div>
            <div>
            <button className='refBtn' onClick={e => {handleClick(e)}}>Refresh</button>
            </div>
            <div className="searchBar">
            <SearchBar/>
            </div>
            <div>
             <Link to="/home/form">
               <button className="createButton" type="button">Create Dog!</button>
             </Link>
           </div>
            <div>
                <select className="filterBy" onChange={e => handleSort(e)}>
                <option value ="default"> Sort by.. </option>
                <option value = "az"> A-Z</option>
                <option value = "za"> Z-A </option>
                <option value = "asc"> Lightest </option>
                <option value = "desc"> Heaviest </option>
                </select>
            </div>

            <div>
            <select  className='filterTemps' value = {temperament} onChange = {(e)=> handleFilterByTemp(e)}>
        <option value="All"> All temperaments </option>
                    {temperaments?.map((temp, index) => (
                      <option onClick = {(e)=> handleClick(e)} key={index}>
                        {temp.name}
                      </option>
                    ))}
        </select>
            </div>

            <div >
        <select className='filterBreeds' onChange = {(e) => {handleFilterByBreed(e)}}> 
            <option value = "all">Breeds</option>
            <option value = "created">Created Breeds</option>
            <option value = "api"> Api Breeds</option>
        </select>
        </div>

            <div  className="Pagination">
            <Pagination
                dogPerPage = {dogPerPage} 
                allDogs = {allDogs.length} 
                pagination = {pagination} 
            />
            </div>
{currentDogs.length === 0 ?
            <div><img className='loadingGif' src={loading} alt="Loading..."/></div> :
            <div className="CardContainer">
                {currentDogs?.map((e) => {
                    return (
                    <div key={e.id} >
                        <Card 
                        id={ e.id }
                        name = { e.name }
                        image = { e.image }
                        temperament = { typeof e.temperament === 'string' ? e.temperament : e.temperament?.join(', ')}
                        min_weight = {e.min_weight}
                        max_weight = {e.max_weight}
                            />
                    </div>
)})}
        </div>
          } 
 </div>

    )
}
