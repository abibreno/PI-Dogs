import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../Redux/dogsActions";
import { Link, useHistory } from "react-router-dom";
import "./Form.css";
import axios from "axios";

const CreateDog = () => {
  const tempForm = useSelector((state) => state.temperaments); //para poder usar el estado.
  const dispatch = useDispatch(); //para poder usar las acciones.
  const [create, setCreate] = useState(false);
  const initialState = {
    name: "",
    heightmin: "",
    heightmax: "",
    weightmin: "",
    weightmax: "",
    life_spanmin: "",
    life_spanmax: "",
    temperaments: [],
    image: "",
  };
  const [errors, setErrors] = useState({ form: "complete form" });
  const [completed, setCompleted] = useState(initialState);
  const history = useHistory(); 

  const finalForm = {
    name: completed.name,
    height: `${completed.heightmin} - ${completed.heightmax}`,
    weight: `${completed.weightmin} - ${completed.weightmax}`,
    life_span: `${completed.life_spanmin} - ${completed.life_spanmax} years`,
    temperament: completed.temperaments.map((item) => item.id),
    image: completed.image,
  };

  useEffect(() => {
    if (tempForm.length === 0) return dispatch(getTemperaments());
  }, [tempForm.length, dispatch]);

  const validate = (completed) => {
    let errors = {};
    if (!completed.name) {
      errors.name = "Dog Name is required";
    }
    if (completed.name.length < 3) {
      errors.name = "Dog Name must have at least 3 characters";
    }
    if (!completed.heightmin || !completed.heightmax) {
      errors.height = "Dog height is required";
    }
    if (parseInt(completed.heightmax) <= parseInt(completed.heightmin)) {
      errors.height = "Height-max must be highter than height-min";
    }
    if (!completed.weightmin || !completed.weightmax) {
      errors.weight = "Dog weight is required";
    }
    if (parseInt(completed.weightmax) <= parseInt(completed.weightmin)) {
      errors.weight = "Weight-max must be highter than weight-min";
    }
    if (!completed.life_spanmin || !completed.life_spanmax) {
      errors.life_span = "Dog life span is required";
    }
    if (parseInt(completed.life_spanmax) <= parseInt(completed.life_spanmin)) {
      errors.life_span = "Life span-max must be highter than life span-min";
    }
    if (completed.temperaments.length === 0) {
      errors.temperaments = "Temperaments are required";
    }
    if (completed.life_spanmax < 0 || completed.life_spanmin < 0) {
      errors.life_span = "Value must be highter than 0";
    }
    if (completed.weightmax < 0 || completed.weightmin < 0) {
      errors.weight = "Value must be highter than 0";
    }
    if (completed.heightmax < 0 || completed.heightmin < 0) {
      errors.height = "Value must be highter than 0";
    }

    return errors;
  };

  const handleChange = (e) => {
    setCompleted({ ...completed, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleTemperaments = (e) => {
    if (
      !completed.temperaments.includes(
        tempForm.find((item) => item.name === e.target.value)
      )
    ) {
      completed.temperaments.push(
        tempForm.find((item) => item.name === e.target.value)
      );
    }
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.values(errors).length === 0) {
      axios.post("http://localhost:3001/dogs", finalForm);
      setCreate(!create);
      setCompleted(initialState);
      alert("Dog created successfully"); 
      history.push("/home"); 
    } else {
      alert("Please fill all the fields");
    }
  };

  function handleDelete(name) {
    setCompleted({
      ...completed,
      temperaments: completed.temperaments.filter((item) => item.name !== name),
    });
  }

  return (
    <div className="backgroundForm">
      <div>
        <div className="formCss">
          <div className="formTitle">
            <h1>Create your own dog!</h1>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label> Name: </label>
            <input
              type="text"
              name="name"
              value={completed.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}

            <div className="lifeSpan">
              <p>
                <label> Life span: </label>
                <input
                  className="inputLife"
                  type="number"
                  min="1"
                  max="25"
                  name="life_spanmin"
                  placeholder="Min"
                  value={completed.life_spanmin}
                  onChange={(e) => handleChange(e)}
                />

                <input
                  className="inputLife"
                  type="number"
                  min="1"
                  max="25"
                  name="life_spanmax"
                  placeholder="Max"
                  value={completed.life_spanmax}
                  onChange={(e) => handleChange(e)}
                />
              </p>
              <p>
                {errors.life_span ? <label>{errors.life_span}</label> : null}
              </p>
            </div>

            <p>
              <label> Weight: </label>
              <input
                type="number"
                name="weightmin"
                min="1"
                placeholder="Min"
                value={completed.weightmin}
                onChange={(e) => handleChange(e)}
              />

              <input
                type="number"
                name="weightmax"
                max="100"
                placeholder="Max"
                value={completed.weightmax}
                onChange={(e) => handleChange(e)}
              />
            </p>
            <p>{errors.weight ? <label>{errors.weight}</label> : null}</p>

            <p>
              <label> Height: </label>
              <input
                type="number"
                name="heightmin"
                min="10"
                placeholder="Min"
                value={completed.heightmin}
                onChange={(e) => handleChange(e)}
              />

              <input
                type="number"
                name="heightmax"
                max="80"
                placeholder="Max"
                value={completed.heightmax}
                onChange={(e) => handleChange(e)}
              />
            </p>
            <p>{errors.height ? <label>{errors.height}</label> : null}</p>

            <label> Image: </label>
            <input
              className="inputImg"
              type="url"
              name="image"
              value={completed.image}
              onChange={(e) => handleChange(e)}
            />

            <div>
              <label> Temperaments: </label>
              <select
                className="inputTemp"
                value={completed.temperaments}
                onChange={(e) => handleTemperaments(e)}
              >
                {tempForm?.map((el) => (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
              <p>
                {errors.temperaments ? (
                  <label>{errors.temperaments}</label>
                ) : null}
              </p>
            </div>

            <div className="temperaments">
              {completed.temperaments?.map((item) => (
                <div key={item.id}>
                  {item.name}{" "}
                  <button onClick={() => handleDelete(item.name)}>x</button>
                </div>
              ))}
            </div>
            <Link to="/home">
              <button className="goBackButton">
                <p> Back </p>
              </button>
            </Link>
            <button className="submitButton" type="submit">
              <p> Submit </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDog;
