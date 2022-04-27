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

    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        input +
        "&appid=89a923d3669dee861721f773a3b3e9ff";

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

    function Truthy({ data }) {
        return (
            <div>
                <h1 className="text-4xl pt-4">
                    {data.name}, {data.sys.country}
                </h1>
                <img src={icon} />
                <Main data={data} />
            </div>
        );
    }

    function Initialize({ data }) {
        console.log(data);
        if (data) {
            return <Truthy data={data} />;
        }
        return <>loading...</>;
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

            <Initialize data={data} />
			<div className="mt-9">
				<FontAwesomeIcon icon={brands("github")} />
			</div>
        </div>
    );
}

export default App;
