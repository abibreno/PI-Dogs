import "./Card.css";
import React from "react";
import { Link } from "react-router-dom";


export default function Card({id, image, name, temperament, min_weight, max_weight}){


    return(

        <div className="dogsContainer">
        <div className="dogsCard">
        <div className="dogsImage">
            {image ? (
                <image className="recipe" src = {`${image}`} alt="No tiene imagen"/>
            ):
            (
                <image className="recipe" src = {`${image}`} alt="No tiene imagen"/>
            )


            }
            </div>
            <Link to = {`/dogs/${id}`}>
            <h2 className="cardName">{name}</h2>
            </Link>
            <p className="cardTemperaments">{temperament}</p>
            <p className="cardWeight">Min Weight:{min_weight} - Max Weight:{max_weight}</p>
            </div>
            </div>

    )
}