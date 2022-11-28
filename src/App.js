import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { motion } from "framer-motion";
import { sunny, cloudy, moist } from "./assets/index";

export default function App() {
    const manila =
        "https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=89a923d3669dee861721f773a3b3e9ff";
    const inputRef = useRef("");
    const [icon, setIcon] = useState(
        "http://openweathermap.org/img/wn/10d@2x.png"
    );
    const [err, setErr] = useState(false);
    const [tempMessage, setTemp] = useState();
    const [weatherProps, setWeatherProps] = useState("");

    useEffect(() => {
        if (weatherProps.celsius >= 19 && weatherProps.celsius <= 25) {
            setTemp(cloudy);
        } else if (weatherProps.celsius <= 18) {
            setTemp(moist);
        } else {
            setTemp(sunny);
        }
    }, [weatherProps.celsius]);

    useEffect(() => {
        ifetch();
    }, []);

    function tempData(data) {
        const Celsius = Math.ceil(data.main.temp - 273.15);
        const Farenheight = Math.ceil((data.main.temp - 273.15) * (9 / 5) + 32);
        const FeelsLike = Math.ceil(data.main.feels_like - 273.15);
        const Visibility = data.visibility / 1000;
        const Humidity = data.main.humidity;
        const Pressure = data.main.pressure;
        const City = data.name;
        const Country = data.sys.country;

        setWeatherProps({
            celsius: Celsius,
            farenheight: Farenheight,
            feelsLike: FeelsLike,
            visibility: Visibility,
            humidity: Humidity,
            pressure: Pressure,
            city: City,
            country: Country,
        });
    }

    function ifetch() {
        fetch(manila)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                tempData(data);
            });
    }

    function handleSubmit(e) {
        const url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            inputRef.current.value +
            "&appid=89a923d3669dee861721f773a3b3e9ff";

        function fetchapi() {
            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res;
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    tempData(res);

                    const iconUrl =
                        "http://openweathermap.org/img/wn/" +
                        res.weather[0].icon +
                        "@2x.png";

                    setIcon(iconUrl);
                })
                .catch((res) => {
                    setErr(true);
                });
        }

        setErr(false);
        fetchapi();
        e.preventDefault();
        inputRef.current.value = "";
    }

    return (
        <div
            className="container mx-auto flex flex-col sm:text-lg  md:text-5xl items-center lg:pt-20"
            style={{
                backgroundImage: `url(${tempMessage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100vh",
            }}
        >
            <div>APLIKASYONG PANAHON</div>
            <InputForm inputRef={inputRef} handleSubmit={handleSubmit} />
            <Initialize weatherProps={weatherProps} err={err} icon={icon} />

            <div className="flex flex-col items-center my-9 ">
                <div className="mb-4 mt-6">
                    <a href="https://vinz009.github.io/homepage/">
                        <FontAwesomeIcon icon={solid("house")} />
                    </a>
                </div>
                <Freepik />
            </div>
        </div>
    );
}

function Initialize({ err, icon, weatherProps }) {
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
    if (weatherProps) {
        return <Truthy weatherProps={weatherProps} icon={icon} />;
    }
    return <>Kumakarga...</>;
}

function Truthy({ icon, weatherProps }) {
    return (
        <div>
            <h1 className="text-center text-6xl pt-4">{weatherProps.city} </h1>
            <h2 className="text-center text-4xl">{weatherProps.country} </h2>
            <motion.div
                key={6}
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
            <Main weatherProps={weatherProps} />
        </div>
    );
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

function Freepik() {
    return (
        <div className="flex flex-col items-center">
            <div className="text-sm">Freepik</div>
            <div className="flex flex-row items-center text-xs space-x-3">
                <a href="https://www.freepik.com/free-photo/cloud-blue-sky_1017702.htm#query=weather&position=27&from_view=search&track=sph">
                    jannoon028
                </a>
                <a href="https://www.freepik.com/free-photo/closeup-shot-window-rainy-gloomy-day-raindrops-rolling-down-window_11942630.htm#query=weather&position=40&from_view=search&track=sph">
                    wirestock
                </a>
            </div>
        </div>
    );
}

function Main({ weatherProps }) {
    return (
        <div className="pt-2.5 sm:space-y-2 lg:space-y-4">
            <motion.div
                key={1}
                animate={{ x: 50 }}
                transition={{
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 4,
                }}
            >
                <div className="flex flex-row items-center space-x-2">
                    <FontAwesomeIcon icon={solid("temperature-low")} fade />
                    <div>
                        {" "}
                        {weatherProps.celsius}&deg;C/{weatherProps.farenheight}
                        &deg;F{" "}
                    </div>
                </div>
            </motion.div>
            <motion.div
                key={2}
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                }}
            >
                <div className="flex flex-row items-center space-x-2">
                    <FontAwesomeIcon icon={solid("thermometer")} fade />
                    <div>Feels Like:{weatherProps.feelsLike}&deg;C</div>
                </div>
            </motion.div>
            <motion.div
                key={3}
                animate={{ x: 50 }}
                transition={{
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 4,
                }}
            >
                <div className="flex flex-row items-center space-x-2">
                    <FontAwesomeIcon icon={solid("fan")} fade />
                    <div>Humidity: {weatherProps.humidity}%</div>
                </div>
            </motion.div>
            <motion.div
                key={4}
                initial={{ x: 50 }}
                animate={{ x: 0 }}
                transition={{
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                }}
            >
                <div className="flex flex-row items-center space-x-2">
                    <FontAwesomeIcon icon={solid("eye")} fade />
                    <div>Visibility: {weatherProps.visibility}km</div>
                </div>
            </motion.div>
            <motion.div
                key={5}
                animate={{ x: 50 }}
                transition={{
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 4,
                }}
            >
                <div className="flex flex-row items-center space-x-2">
                    <FontAwesomeIcon icon={solid("wind")} fade />
                    <div>{weatherProps.pressure}hPa</div>
                </div>
            </motion.div>
        </div>
    );
}
