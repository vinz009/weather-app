import React, { useEffect, useState, useRef } from "react";
import Main from "./main.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { motion } from "framer-motion";

import temp from "./temp";
import sunnyOne from "./assets/sunny.jpg";

export default function App() {
    const manila =
        "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=89a923d3669dee861721f773a3b3e9ff";
    const [data, setData] = useState(ifetch);
    const [icon, setIcon] = useState(
        "http://openweathermap.org/img/wn/10d@2x.png"
    );
    const inputRef = useRef("cebu");
    const [err, setErr] = useState(false);

	const [tempMessage, setTemp] = useState(sunnyOne);

    function ifetch() {
        fetch(manila)
            .then((res) => res.json())
            .then((res) => setData(res))
    }

    function handleSubmit(e) {
        const url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            inputRef.current.value +
            "&appid=89a923d3669dee861721f773a3b3e9ff";
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
                })
                .then((res) => res.json())
                .then((res) => setData(res))
                .catch((res) => {
                    setErr(true);
                });
        }

        setErr(false);
        fetchapi();
        e.preventDefault();
        inputRef.current.value = "";
        setIcon(iconUrl);
		setTemp(temp(data));
    }

    return (
        <div
            className="container mx-auto flex flex-col sm:text-sm  lg:text-4xl items-center lg:pt-20"
            style={{
                backgroundImage: `url(${tempMessage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100vh",
            }}
        >
            <InputForm inputRef={inputRef} handleSubmit={handleSubmit} />
            <Initialize data={data} err={err} icon={icon} />
            <div className="flex flex-col items-center my-9 ">
				<div>
                <a href="https://github.com/vinz009/weather-app">
                    <FontAwesomeIcon icon={brands("github")} />
                </a>
				</div>
				<Freepik />
            </div>
        </div>
    );
}

function Truthy({ data, icon }) {
    return (
        <div>
            <h1 className="text-center text-4xl pt-4">{data.name}</h1>
            <h2 className="text-center text-2xl">{data.sys.country}</h2>
            <motion.div
                animate={{ x: 100 }}
                transition={{
                    ease: "easeOut",
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                }}
            >
                <img src={icon} />
            </motion.div>
            <Main data={data} />
        </div>
    );
}
function Initialize({ data, err, icon }) {
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
        return <Truthy data={data} icon={icon} />;
    }
    return <>Kumakarga...</>;
}

function InputForm({ inputRef, handleSubmit }) {
    return (
        <div className="mt-8">
            <form className="space-x-2 " onSubmit={handleSubmit}>
                <input
                    className="rounded-tl-lg rounded-br-lg pl-2"
                    type="text"
                    ref={inputRef}
                    placeholder="Please enter city..."
                />
                <button
                    className="rounded-full bg-cyan-400 w-8 h-8"
                    onClick={handleSubmit}
                >
                    <FontAwesomeIcon icon={solid("magnifying-glass")} bounce />
                </button>
            </form>
        </div>
    );
}
function Freepik () {
	return (
		<div className="flex flex-col items-center" >
		<div className="text-sm">Freepik</div>
		<div className="flex flex-row items-center text-xs space-x-3" >
<a href="https://www.freepik.com/free-photo/cloud-blue-sky_1017702.htm#query=weather&position=27&from_view=search&track=sph">jannoon028</a>   
		<a href="https://www.freepik.com/free-photo/closeup-shot-window-rainy-gloomy-day-raindrops-rolling-down-window_11942630.htm#query=weather&position=40&from_view=search&track=sph">wirestock</a>
		</div>
		</div>
	);
}
