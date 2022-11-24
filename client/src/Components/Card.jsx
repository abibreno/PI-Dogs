import './Card.css'
import React from "react";
import { Link } from "react-router-dom";
export default function Card({ id, image, name, temperament, min_weight, max_weight }){


 return(
    <div className='superContainer'>
    <div className="dogsContainer">
    <div className="dogsCard">
    <div className="dogsImage">
    {image ? (
        <img className="recipe" src={`${image}`} alt = "There is no img"/>
            ):
                (
                    <img className="recipe" src="" alt = "There is no img"/>
                )
            }
    </div>
    <Link to ={`/dogs/${id}`} > 
    <h2 className="cardName"> {name} </h2>
            </Link>
    <p className="cardTemperaments"> {temperament} </p>

    <p className="cardWeight"> Min Weight: {min_weight} - Max weight: {max_weight}  </p> 



    </div>
    </div>
    </div>
 )
}