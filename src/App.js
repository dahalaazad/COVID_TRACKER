import React, { useState, useEffect, Fragment } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';

import InfoBox from './InfoBox';
import Map from "./Map";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  //console.log(countries);
  const [country, setCountry] = useState ('worldwide');
  //const [countryName, setCountryName] = useState();
  const [countryInfo, setCountryInfo] = useState({});
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        // const x = [{
        //           name:'Worldwide',
        //           code: 'WW',
        //           value:0,
        //           key: 0
        //       }];
        const countries = data.map((country,index) => (
          
          {
            name:country.country,
           // code: country.countryInfo.iso2,
            value: country.countryInfo.iso3,
            //value: index+1,
            key:index
            
          }
          ));
          //const countries = x.concat(countries1); 
          
          
          setCountries(countries);
         // console.log(countries);
      })
    }
      getCountriesData();
      
  },[]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //const countryName = countries[event.target.value].name;

    console.log('----->', countryCode);
    //setCountryName(countryName);
    
    const url = countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
       .then(response => response.json())
       .then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
          //console.log(url,'--->',countryInfo);
       })
  };
  console.log(countryInfo);
  
  return (
    <Fragment>
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
                    countries.map((country) => (
                      <MenuItem  key = {country.id} 
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
                    <InfoBox title = 'Coronavirus Cases' 
                            cases={countryInfo.todayCases} 
                            total={countryInfo.cases} />
                    <InfoBox title = 'Recovered'
                            cases={2000}  
                            total={countryInfo.recovered} />
                    <InfoBox title = 'Deaths' 
                            cases={2000} 
                            total={countryInfo.deaths} />
            
            </div>

            {/*Map*/}
                    <Map />

          </div>
          <Card className="app__right">
            RIGHT SIDE
            <CardContent>
              {/*Table*/}
              <h3>Live Cases by Country</h3>
              {/*Graph*/}
              <h3>Worldwide new cases</h3>
            </CardContent>
          </Card>
        </div>
    </Fragment>
  );
}

export default App;
