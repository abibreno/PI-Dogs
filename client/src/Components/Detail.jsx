import "./Detail.css";
// import loading from '../photos/loading.gif'
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getDogsDetails, clean } from "../Redux/dogsActions";
import loading from "../Fotos/loading.gif";
var img =
  "https://cdnb.artstation.com/p/assets/images/images/040/159/961/original/camila-xiao-pixel-art-doge-cute-dog-aniamted-loop-gif-barking-running-scared-and-happy-loop-gif-8bit-16bit.gif?1628036255";

export default function Details() {
  const dispatch = useDispatch(); //para poder usar las acciones
  let dogsDetail = useSelector((state) => state.dogsDetails); // para poder usar el estado
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getDogsDetails(id));
    dispatch(clean());
  }, [dispatch, id]);



  return (
    <div className="background">
      <div className="detailsCss">
        
        {dogsDetail.length === 0 ? (
          <img src={loading} alt="Loading..." />
        ) : (
          <div className="detailsContainer">
            <div>
              <h2> {dogsDetail.name} </h2>
              <div className="img">
                <img src={dogsDetail.image ? dogsDetail.image : img} />
              </div>
              <h3>
                {dogsDetail.temperaments ? (
                  <p>
                    {" "}
                    <b>Temperaments: </b>
                    {dogsDetail.temperaments}.
                  </p>
                ) : null}
              </h3>
              <div className="weightCss">
                <p> Weight: {dogsDetail.weight} </p>
              </div>
              <p className="heightCss"> Height: {dogsDetail.height} </p>
              <p className="lifeSpanCss"> Life Span: {dogsDetail.life_span} </p>
            </div>
            <Link to="/home">
              <button> Back </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
