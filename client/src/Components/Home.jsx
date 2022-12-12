import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDogs,
  orderBy,
  filterByTemperaments,
  getTemperaments,
  filterByBreed, 
} from "../Redux/dogsActions";
import Card from "./Card";
import "./Home.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import loading from "../Fotos/loading.gif";
import imagen from "../Fotos/favicon.png"

export default function Home() {
  //esta funcion es la que se encarga de renderizar el componente Home

  const dispatch = useDispatch(); //para poder usar las acciones
  const allDogs = useSelector((state) => state.dogs); //para poder usar el estado
  const temperaments = useSelector((state) => state.temperaments); // para poder usar el estado
  const [, setOrder] = useState("All"); //estado para el ordenamiento
  const [, setBreeds] = useState("All"); //aca lo uso para filtrar por raza

  const [currentPage, setCurrentPage] = useState(1); //aca paso (1) para que empiece en la pagina 1
  const [dogsPerPage] = useState(8); //aca paso (8) para que muestre 8 perros por pagina
  const indexOfLastDog = currentPage * dogsPerPage; //aca calculo el ultimo perro de la pagina
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //aca calculo el primer perro de la pagina
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //aca calculo los perros que se van a mostrar en la pagina
  const [temperament, setTemperament] = useState("All"); //aca lo uso para filtrar por temperamento

  const pagination = (currentPageNumber) => {
  
    setCurrentPage(currentPageNumber); //esto es para que cuando cambie de pagina se actualice
  };

  useEffect(() => {
    //aca uso el useEffect para que cuando se renderice la pagina se ejecute la accion
    setCurrentPage(1); //esto es para que cuando cambie de pagina se actualice
  }, [allDogs]); //aca le paso el estado para que se ejecute cuando cambie

  useEffect(() => {
    if (allDogs.length === 0) {
      dispatch(getDogs()); //aca uso la accion para traer los perros
      dispatch(getTemperaments()); //aca uso la accion para traer los temperamentos
    }
  }, [dispatch, allDogs.length]); //aca le paso el dispatch para que se ejecute cuando cambie

  function handleClick(e) {
    //handleclick para el ordenamiento
    e.preventDefault(); //aca uso el preventDefault para que no se recargue la pagina
    dispatch(getDogs());
  }

  function handleSort(e) {
    //aca uso la funcion para ordenar
    // e.preventDefault();
    dispatch(orderBy(e.target.value)); //aca uso la accion para ordenar
    setCurrentPage(1); //esto es para que cuando cambie de pagina se actualice
    setOrder(e.target.value); //setorder para que se actualice el estado
  }

  function handleFilterByTemp(e) {
    //aca uso la funcion para filtrar por temperamento
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
    setTemperament(e.target.value);
  }

  function handleFilterByBreed(e) {
    e.preventDefault();
    dispatch(filterByBreed(e.target.value));
    setCurrentPage(1);
    setBreeds(e.target.value);
  }



  

  return (
    <div className="homeDiv">
      <div className="welcome">
        <img src={imagen} alt="img" />
        <h1> Welcome PI Dogs</h1>
        <h2>Created by Abi Breno</h2>
      </div>
      <div>
        <button
          className="refBtn"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh
        </button>
      </div>
      <div className="searchBar">
        <SearchBar />
      </div>
      <div>
        <Link to="/home/form">
          <button className="createButton" type="button">
            Create Dog!
          </button>
        </Link>
      </div>
      <div>
        <select className="filterBy" onChange={(e) => handleSort(e)}>
          <option value="default"> Sort by.. </option>
          <option value="az"> A-Z</option>
          <option value="za"> Z-A </option>
          <option value="asc"> Lightest </option>
          <option value="desc"> Heaviest </option>
        </select>
      </div>

      <div>
        <select
          className="filterTemps"
          value={temperament}
          onChange={(e) => handleFilterByTemp(e)}
        >
          <option value="All"> All temperaments </option>
          {temperaments?.map((temp, index) => (
            <option onClick={(e) => handleClick(e)} key={index}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          className="filterBreeds"
          onChange={(e) => {
            handleFilterByBreed(e);
          }}
        >
          <option value="all">Breeds</option>
          <option value="created">Created Breeds</option>
          <option value="api"> Api Breeds</option>
        </select>
      </div>

      <div className="Pagination">
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>

      {currentDogs.length === 0 ? (
        <div>
          {<img className="loadingGif" src={loading} alt="Loading..." />}
        </div>
      ) : (
        <div className="CardContainer">
          {currentDogs?.map((e) => {
            return (
              <div key={e.id}>
                <Card
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  temperament={e.temperaments?.join(", ")}
                  weight={e.weight}
                  height={e.height}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
