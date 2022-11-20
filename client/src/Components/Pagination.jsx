import React from "react";
import './Pagination.css'


export default function Pagination({dogsPerPage, currentPage, allDogs, pagination}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){ 
        pageNumbers.push(i)
    }
    if(currentPage === pageNumbers.length + 1){ //
        pagination(1)
    }
 
    return(
        <nav className="pagCss">
            <ul> 
                {pageNumbers?.map(number => ( 
                    <li key={number}> 
                         <button className="buttonCss" onClick = {() => pagination(number)}>{number}</button>
                    </li>
                    ))}
            </ul>
            </nav>
    )
}