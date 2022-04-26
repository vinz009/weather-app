import React, { useEffect, useState } from "react";
import Main from './main.js';

function App() {

    const manila =
        "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=89a923d3669dee861721f773a3b3e9ff";
    const [data, setData] = useState(ifetch);

    const [input, setInput] = useState('');
	const [icon,setIcon] = useState('http://openweathermap.org/img/wn/10d@2x.png'); 

    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        input +
        "&appid=89a923d3669dee861721f773a3b3e9ff";

	
			//if (data === undefined) {
				//const load = return <> Still Loading... </>;
	console.log(data);
	
        function ifetch() {
            fetch(manila)
                .then((res) => res.json())
                .then((res) => setData(res));
        }

    function handleSubmit(e) {
        function fetchapi() {
            fetch(url)
                .then((res) => res.json())
                .then((res) => setData(res));
            e.preventDefault();
        }
        fetchapi();
    }

    function handleChange(e) {
        setInput(e.target.value);
    }

	function Truthy ({data}) {
		return (
            <div>
				<h2>{data.name}, {data.sys.country}</h2>
				<img src={icon} />
				<Main data={data} />
            </div>
		)
	}

	function Initialize({data}) {
		console.log(data);
		if(data) {
			return <Truthy data={data} />;
		} 
		return <>loading...</>;
	}

    return (
        <div className="container">
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Search for a City..."
                    />
                    <input type="submit" value="tiraha men" />
                </form>
            </div>
		<Initialize data={data} />
        </div>
    );
}

export default App;
