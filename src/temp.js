
import sunny from './assets/sunny.jpg' ;
import cloudy from './assets/cloudy.jpg' ;
import moist from './assets/moist.jpg' ;

export default function temp (data) {
	const celsius = Math.ceil(data.main.temp - 273.15);
	if(celsius >= 19 && celsius <= 23) {
		return cloudy ;
	}
	else if(celsius <= 18)  {
		return moist ;
	}
	else {
		return sunny ;
	}
}
