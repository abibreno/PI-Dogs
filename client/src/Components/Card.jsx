import "./Card.css";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {deleteDog} from "../Redux/dogsActions";
import {
  getDogs,
} from "../Redux/dogsActions";

export default function Card({ id, image, name, temperament, weight }) {


const dispatch = useDispatch();
const handleClick = (id) => {
  dispatch(deleteDog(id))
  alert("Dog removed successfully")
  dispatch(getDogs());
}


  return (
    <div className="superContainer">
      <div className="dogsContainer">
        <div className="dogsCard">
          <div className="dogsImage">
            {image ? (
              <img className="recipe" src={`${image}`} alt="There is no img" />
            ) : (
              <img className="recipe" src="" alt="There is no img" />
            )}
          </div>
          <Link to={`/dogs/${id}`}>
            <h2 className="cardName"> {name} </h2>
          </Link>
          <p className="cardTemperaments"> Temperaments: {temperament} </p>

          <p className="cardWeight"> Weight: {weight} </p>

          <button className="btnDelete"  onClick={() => handleClick(id)} >Delete Dog</button>
        </div>
      </div>
    </div>
  );
}
