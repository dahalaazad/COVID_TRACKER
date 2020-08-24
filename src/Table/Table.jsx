import React from 'react';
import './Table.css';

function Table({countries},index) {
    //console.log(countries);
    //console.log(index);
    return <div className="table">
        <tr>
           <td className="Rank">Rank</td>
           <td>Country</td>
           <td>Number</td>
        </tr>
        {countries.map(({country,cases},index) => (
            <tr>
                <td>{index+1}</td>
                <td>{country}</td>
                <td>{cases} </td>
            </tr>
            
        ))}
    </div>
    
}

export default Table;       