import React from 'react';
import './Table.css';
import numeral from "numeral";

function Table({countries},index) {
    //console.log(countries);
    //console.log(index);
    return <div className="table"
                key={index}>
        <table>            
        <tr>
           <td>Rank</td>
           <td>Country</td>
           <td>Number</td>
        </tr>
        {countries.map((country,index) => (
            <tr>
                <td>{index+1}</td>
                <td>{country.country}</td>
                <td>{numeral(country.cases).format("0,0")} </td>
            </tr>
            
        ))}
        </table>
    </div>
    
}

export default Table;       