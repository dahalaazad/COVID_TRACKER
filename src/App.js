import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox/InfoBox';
import Map from "./Map/Map";
import Table from "./Table/Table";
import LineGraph from "./LineGraph";
import {sortData, prettyPrintStat} from './util';
//import Leaflet from './leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
//import numeral from 'numeral';
//import { CRS } from "leaflet";

function App() {
  const [countries, setCountries] = useState([]);
  //console.log(countries);
  const [country, setCountry] = useState ('worldwide');
  //const [countryName, setCountryName] = useState();
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:27, lng:30});
  const [mapZoom,setMapZoom] = useState(2);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then((data) => {
        setCountryInfo(data);
        //setCasesType('recovered')
      });
  },[])
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country,index) => (
          {
            name:country.country,
           // code: country.countryInfo.iso2,
            value: country.countryInfo.iso2,
            //value: index+1,
            key:index
            
          }
          ));
          //const countries = x.concat(countries1); 
          
          const sortedData = sortData(data);
          setTableData(sortedData); 
          //console.log(data);
          setMapCountries(data);
          setCountries(countries);
         // console.log(countries);
         console.log(mapCenter);
         
      })
    }
      getCountriesData();
      
  },[]);
  //console.log(mapCountries);
  //console.log(casesType);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //const countryName = countries[event.target.value].name;

    console.log('----->', countryCode);
    //setCountryName(countryName);
    
    const url = 
      (countryCode === 'worldwide') 
        ? 'https://disease.sh/v3/covid-19/all' 
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setCountry(countryCode);
            setCountryInfo(data);
            //console.log(data.countryInfo);
            if (countryCode === 'worldwide') {
               setMapZoom(3);
               setMapCenter({lat:27.7069342, lng:85.3767583}) 
            }
            else {
              setMapCenter([data.countryInfo.lat,data.countryInfo.long])
              setMapZoom(4);
            }
            //console.log(url,'--->',countryInfo);
            
        })
    };

   // console.log(data.countryInfo,'--->', mapCenter);
  //console.log(countryInfo);
  console.log(mapZoom);
  
  return (
    
        <div className="App">
          <div className="app__left">
            <div className="app__header">
              <h1 className='title'>COVID-19 TRACKER</h1>
              <FormControl className="app__dropdown">
                <Select
                  key = {country.id}
                  variant = 'outlined'
                  onChange = {onCountryChange}
                  value = {country}>
                    <MenuItem value='worldwide'>Worldwide</MenuItem>
                    {/*Loop through all countries and show dropdown*/}
                    {
                    countries.map((country,index) => (
                      <MenuItem  key ={ index }
                                value = {country.value}>
                        {country.name} 
                      </MenuItem>
                    ))
                    }
                    {/*<MenuItem value = 'worldwide'>Worldwide</MenuItem>
                    <MenuItem value = 'worldwide'>Option 2</MenuItem>
                    <MenuItem value = 'worldwide'>Option 3</MenuItem>
                    <MenuItem value = 'worldwide'>Option 4</MenuItem>*/}
                </Select>
              </FormControl><br/><br/>
                  {/*<h2>Country: {countryName}</h2>*/}
            </div>
            
            <div className="app__stats">
            {/*Header*/}
            {/*Title + select input dropdown field*/}
            
            {/*3 Infoboxes*/}
              
            {/**/}{/**/}
                    <InfoBox isRed
                             active = {casesType ==='cases'}
                             onClick = {(e) => setCasesType('cases')}
                             title = 'Coronavirus Cases' 
                             cases={prettyPrintStat(countryInfo.todayCases)} 
                             total={prettyPrintStat(countryInfo.cases)} />
                    <InfoBox isGreen
                             active = {casesType ==='recovered'}
                             onClick = {(e) => setCasesType('recovered')}
                             title = 'Recovered'
                             cases={prettyPrintStat(countryInfo.todayRecovered)}  
                             total={prettyPrintStat(countryInfo.recovered)} />
                    <InfoBox isBlack
                             active = {casesType ==='deaths'}
                             onClick = {(e) => setCasesType('deaths')}
                             title = 'Deaths' 
                             cases={prettyPrintStat(countryInfo.todayDeaths)} 
                             total={prettyPrintStat(countryInfo.deaths)} />
            
            </div>

            
          <Map casesType = {casesType}
               countries={mapCountries}
               center = {mapCenter}
               zoom = {mapZoom}
                />

          </div>
          <Card className="app__right">
            <CardContent>
              {/*Table*/}
              <h3>Live Cases by Country</h3>
              <Table 
                     countries={tableData} />
                            {/*Graph*/}
                            
             <h3 className = 'app__graphTitle'>Worldwide new {casesType}</h3>
            <LineGraph 
              className = 'app__graph'
              casesType = {casesType} />
              
            </CardContent>
          </Card>
        </div>
    
  );
}

export default App;
