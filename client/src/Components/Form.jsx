import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {createDog, getTemperaments} from '../Redux/dogsActions';
import { Link, useHistory } from 'react-router-dom';
import './Form.css';

function validate (input) {
    let errors = {};
    if(!input.name){
        errors.name = 'Name is required'
    }
    else if(!input.name.match(/^[A-Za-z\s]+$/)){ //.match: busca coincidencias en una cadena de texto.
        errors.name = 'Only letters, please'
    }

    if(!input.life_span){
        errors.life_span = 'Life span is required'
    }
    else if(input.life_span < 1 || input.life_span > 25){
        errors.life_span = 'Between 1-25 years';
    }

    if(!input.min_height){
        errors.min_height = 'Min height is required'
    }
    else if(input.min_height < 10){
        errors.min_height = 'Must be more than 10cm'
    }

    if(!input.max_height){
        errors.max_height = 'Max height is required'
    }
    else if(input.max_height > 80){
        errors.max_height = 'Must be less than 80cm'
    }

    if(!input.min_weight){
        errors.min_weight = 'Min weight is required'
    }
    else if(input.min_weight < 1){
        errors.min_height = 'Must be more than 1kg'
    }

    if(!input.max_weight){
        errors.max_weight = 'Max weight is required'
    }
    else if(input.max_height > 100){
        errors.max_weight = 'Must be less than 100kg'
    }
    else if(Number(input.min_height) > Number(input.max_height)){
        errors.max_height = 'Must be higher than min height'
    }
    else if(Number(input.min_weight) > Number(input.max_weight)){
        errors.max_weight = 'Must be heavier than min weight'
    }
    return errors;
};

export default function Form(){
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [errors, setErrors] = useState({});//guardo los errores.
    const temperaments = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    const [input, setInput] = useState({ //Para guardar los datos
        name: "",
        life_span: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        image: "",
        temperament: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value //guarda el nuevo valor.
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value //muestra el error.
        }))
    }

    function handleTemperaments(e) {
        e.preventDefault(); //no se recargue la pagina.
        setInput({
            ...input,
            temperament: [
                ...input.temperament, e.target.value //guarda valor nuevo.
            ]
        })
        setErrors(validate({
            ...input,
            temperament: [
                ...input.temperament, e.target.value
            ]
        }))
    }

    function handleSubmit(e) {
        if(
            input.name && input.temperament
        ){
            e.preventDefault();
            dispatch(createDog(input));
            alert("Dog created succesfully");
            setInput({
                name: "",
                life_span: "",
                min_height: "",
                max_height: "",
                min_weight: "",
                max_weight: "",
                image: "",
                temperament: [],
            })
            history.push("/home");
        }else{
            alert("Please fill all the fields");
        }
    }

    function handleDelete(e){
        e.preventDefault();
        setInput((input)=>({
            ...input,
            temperament: input.temperament.filter((t) => t !== e.target.value)
        }))
    }

    return (
        <div className="formCss">
            <div className="formTitle">
                <h1>Create your own dog!</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label> Name: </label>
                <input type="text" name="name" value={input.name} onChange = {(e) => handleChange(e)} /> 
                {errors.name && <p>{errors.name}</p>}


                <label> Life span: </label>
                <input type='number' min='1' max='25' name='life_span' value={input.life_span} onChange = {(e) => handleChange(e)} />
                {errors.life_span && <p>{errors.life_span}</p>}


                <label> Min weight: </label>
                <input type='number' name='min_weight' min='1' value={input.min_weight} onChange = {(e) => handleChange(e)} />
                {errors.min_weight && <p>{errors.min_weight}</p>}


                <label> Max weight: </label>
                <input type='number' name='max_weight' max='100' value={input.max_weight} onChange = {(e) => handleChange(e)} />
                {errors.max_weight && <p>{errors.max_weight}</p>}


                <label> Min height: </label>
                <input type='number' name='min_height' min='10' value={input.min_height} onChange = {(e) => handleChange(e)} 
                 />
                {errors.min_height && <p>{errors.min_height}</p>}
                

                <label> Max height: </label>
                <input type='number' name='max_height' max='80' value={input.max_height} onChange = {(e) => handleChange(e)} />
                {errors.max_height && <p>{errors.max_height}</p>}


                <label> Image: </label>
                <input type='url' name='image' value={input.image} onChange = {(e) => handleChange(e)} />

                <div>
            <label> Temperaments: </label>
            <select value={input.temperament} onChange={(e) => handleTemperaments(e)}>
                {temperaments.map((el) => (
                    <option key={el.id} value={el.name}>
                        {el.name}
                    </option>
                ))}
            </select>
              </div>
                <Link to="/home">
              <button className='goBackButton'><p> Back </p></button>
                </Link>
                </form>
                <button className='submitButton' type="submit" onClick={(e) => handleSubmit(e)}><p> Submit </p></button>
                <div className="temperaments"> 
                {input.temperament.map((t) => ( 
                    <div className="temperament">
                        <p>{t}</p>
                        <button className="deleteButton" value={t} onClick={(e) => handleDelete(e)}> x </button>
                        </div>
                ))}
                </div>
            </div> 
    )
}
