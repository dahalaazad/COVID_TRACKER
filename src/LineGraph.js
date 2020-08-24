import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { numeral } from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
}

function LineGraph() {
    const [data,setData] = useState({});
    const URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';
    useEffect(() => {
        fetch(URL)
         .then(response => response.json())
         .then((data) => {
             console.log(data);
             const chartData = buildChartdata(data);
             setData(chartData);
         } )
    }, []);

    const buildChartdata = (data,casesType = 'cases') => {
        const chartData = [];
        let lastDataPoint;

        for(let date in data.cases) {
            if(lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                };
                chartData.push(newDataPoint);

            }
            lastDataPoint = data['cases'][date];
        }
        return chartData;
    };

    return (
        <div>
            <Line 
                data ={{ datasets: [
                    {
                        backgroundColor:'rgba(204,16,52,0.',
                        borderColor: '#CC1034',
                        data:data
                    }
                ]
             }}
                options={options}
            />
        </div>
    );
}

export default LineGraph;