import React, { useState, useEffect } from 'react'; 

export default function Main ({data}) {
	
    const celsius = Math.round(data.main.temp - 273.15) ;
    const faren = Math.round((data.main.temp - 273.15) * (9/5) + 32) ;
    const feelsLike = Math.round(data.main.feels_like - 273.15) ;
	const visi = data.visibility / 1000 ;


	return (
		<div>
		<div>{celsius}&deg;C/{faren}&deg;F</div>		
		<div>Feels Like:{feelsLike}&deg;C</div>		
		<div>Humidity: {data.main.humidity}%</div>
		<div>Visibility: {visi}km</div>
		<div>{data.main.pressure}hPa</div>
		</div>
	); 
}
