import React, { useEffect, useState, useRef } from "react";
import Main from "./main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    solid,
    regular,
    brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import {motion} from "framer-motion"; 

function App() {
    const manila =
        "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=89a923d3669dee861721f773a3b3e9ff";
    const [data, setData] = useState(ifetch);

    const [input, setInput] = useState("");
    const [icon, setIcon] = useState(
        "http://openweathermap.org/img/wn/10d@2x.png"
    );

    const [set, isSet] = useState(false);
    const [err, setErr] = useState(false);
    const [errMessage, setErrMessage] = useState("");

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
        const iconUrl =
            "http://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png";

        function fetchapi() {
            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res;
                    }
                    return Promise.reject(res);
                })
                .then((res) => res.json())
                .then((res) => setData(res))
                .catch((res) => {
                    setErr(true);
                    setErrMessage(res.status);
                });
            e.preventDefault();
        }

        function setSet() {
            if (set) {
                isSet(false);
            } else {
                isSet(true);
            }
        }
        setErr(false);
        fetchapi();
        setIcon(iconUrl);
        setSet();
    }

	const inputRef = useRef(null);

    function handleChange(e) {
        setInput(e.target.value);
    }

    function Truthy({ data, set }) {
        return (
            <div>
                <h1 className="text-center text-4xl pt-4">{data.name}</h1>
                <h2 className="text-center text-2xl">{data.sys.country}</h2>
				<motion.div
					animate={{ x: 100 }}
					transition= {{ 
						ease: "easeOut", 
						duration: 3,
						repeat: Infinity,
						repeatType: "reverse",
						repeatDelay: 1
					}}
				>
					<img src={icon} />
				</motion.div>
                <Main data={data} set={set} />
            </div>
        );
    }

    function Initialize({ data, set, err }) {
        if (err) {
            return (
                <div>
                    <h1 className="text-center mt-4 text-4xl">
                        Pls enter valid city name.
                    </h1>
                    <div className="text-center mt-8">Enter input again...</div>
                </div>
            );
        }
        if (data) {
            return <Truthy data={data} set={set} />;
        }
        return <>Kumakarga...</>;
    }


	function InputValue () {
		return (
                    <input
                        className="rounded-tl-lg rounded-br-lg pl-2"
                        type="text"
					//	ref={inputRef}
                        onChange={handleChange}
                        placeholder="Ilagay ang Ciudad..."
                    />
		);

	}


    return (
        <div className="container mx-auto flex flex-col sm:text-sm  lg:text-4xl items-center lg:pt-20">
            <div className="mt-8">
                <form className="space-x-2 " onSubmit={handleSubmit}>
					<InputValue  />
                    <button
                        className="rounded-full bg-cyan-400 w-8 h-8"
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={solid("magnifying-glass")} />
                    </button>
                </form>
            </div>

            <Initialize data={data} set={set} err={err} />
            <div className="my-9 ">
                <a href="https://github.com/vinz009/weather-app">
                    <FontAwesomeIcon icon={brands("github")} />
                </a>
            </div>
        </div>
    );
}

export default App;
