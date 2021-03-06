import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import  numeral  from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio:false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format('+0,0');
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display:false,
                },
                ticks: {
                    //Include a dollar sign in the ticks
                     callback: function (value) {
                        return numeral(value).format('0a');
                    },
                },
            },
        ],
    },
};


function LineGraph({ casesType = 'cases', ...props}) {
    
    const [data, setData] = useState({});
    
    const buildChartdata = (data, casesType = 'cases') => {
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
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    };

    const URL = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';
    useEffect(() => {
        const fetchData = async () => {
           await fetch(URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                let chartData = buildChartdata(data,casesType);
                setData(chartData);
            } );
        };
        //console.log(data);
        fetchData();
        
    },[casesType]);

    

    return (
        <div className = {props.className}>
            {/*<h1>Graph</h1> */}
            {data?.length > 0 && (
                <Line 
                    options={options}
                    data ={{ 
                        datasets: [
                        {
                            backgroundColor:'rgba(204,16,52,0.5',
                            borderColor: '#CC1034',
                            data:data,
                        },
                    ],
                }} />
                )}
            
        </div>
    );
}

export default LineGraph;