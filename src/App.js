import React, { useEffect, useState } from "react";
import Main from "./main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    solid,
    regular,
    brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

function App() {
    const manila =
        "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=89a923d3669dee861721f773a3b3e9ff";
    const [data, setData] = useState(ifetch);

    const [input, setInput] = useState("");
    const [icon, setIcon] = useState(
        "http://openweathermap.org/img/wn/10d@2x.png"
    );

	const [set,isSet] = useState(false); 

    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        input +
        "&appid=89a923d3669dee861721f773a3b3e9ff";

	console.log(set);	

    function ifetch() {
        fetch(manila)
            .then((res) => res.json())
            .then((res) => setData(res));
    }

    function handleSubmit(e) {
		const iconUrl = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';

        function fetchapi() {
            fetch(url)
                .then((res) => res.json())
                .then((res) => setData(res));
            e.preventDefault();
        }

		function setSet () {
			if(set){
				isSet(false);
			} else {
				isSet(true);
			}
		}

        fetchapi();
		setIcon(iconUrl);
		setSet();
    }

    function handleChange(e) {
        setInput(e.target.value);
    }

    function Truthy({ data, set }) {
        return (
            <div>
                <h1 className="text-center text-4xl pt-4">
                    {data.name}
                </h1>
				<h2 className="text-center text-2xl">{data.sys.country}</h2>
                <img src={icon} />
                <Main data={data} set={set} />
            </div>
        );
    }

    function Initialize({ data, set }) {
        console.log(data);
        if (data) {
            return <Truthy data={data} set={set} />;
        }
        return (
		<>Kumakarga...</>
		)
    }

    return (
        <div className="container flex flex-col items-center justify-center pt-20">
            <div className="">
                <form className="space-x-2" onSubmit={handleSubmit}>
                    <input
                        className="rounded-tl-lg rounded-br-lg pl-2"
                        type="text"
                        onChange={handleChange}
                        placeholder="Ilagay ang Ciudad..."
                    />
                    <button
                        className="rounded-full bg-cyan-400 w-8 h-8"
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={solid("magnifying-glass")} />
                    </button>
                </form>
            </div>

            <Initialize data={data} set={set} />
			<div className="mt-9">
				<a href="https://github.com/vinz009/weather-app">
					<FontAwesomeIcon icon={brands("github")} />
				</a>
			</div>
        </div>
    );
}

export default App;
