import React, { useState, useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Main ({data}) {
	
    const celsius = Math.round(data.main.temp - 273.15) ;
    const faren = Math.round((data.main.temp - 273.15) * (9/5) + 32) ;
    const feelsLike = Math.round(data.main.feels_like - 273.15) ;
	const visi = data.visibility / 1000 ;


	return (
		<div>
			<div>
				<FontAwesomeIcon icon={solid('temperature-low')} />
				<div>{celsius}&deg;C/{faren}&deg;F</div>
			</div>
			<div>
				<FontAwesomeIcon icon={solid('thermometer')} />
				<div>Feels Like:{feelsLike}&deg;C</div>		
			</div>
			<div>
				<FontAwesomeIcon icon={solid('fan')} />
				<div>Humidity: {data.main.humidity}%</div>
			</div>
			<div>
				<FontAwesomeIcon icon={solid('eye')} />
				<div>Visibility: {visi}km</div>
			</div>
			<div>
				<FontAwesomeIcon icon={solid('wind')} />
				<div>{data.main.pressure}hPa</div>
			</div>
		</div>
	); 
}
