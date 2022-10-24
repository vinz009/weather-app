import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
    solid,
} from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Main({ data, set }) {
    const celsius = Math.round(data.main.temp - 273.15);
    const faren = Math.round((data.main.temp - 273.15) * (9 / 5) + 32);
    const feelsLike = Math.round(data.main.feels_like - 273.15);
    const visi = data.visibility / 1000;

    const ttt = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: 0 },
    };

    return (
        <div className="pt-2.5 sm:space-y-2 lg:space-y-4">
            <motion.div variants={ttt} animate={set ? "open" : "open"}>
                Tricky
            </motion.div>

            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("temperature-low")} />
                <div>
                    {celsius}&deg;C/{faren}&deg;F
                </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("thermometer")} />
                <div>Feels Like:{feelsLike}&deg;C</div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("fan")} />
                <div>Humidity: {data.main.humidity}%</div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("eye")} />
                <div>Visibility: {visi}km</div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("wind")} />
                <div>{data.main.pressure}hPa</div>
            </div>
        </div>
    );
}
