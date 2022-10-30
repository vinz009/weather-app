import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
    solid,
	regular,
} from "@fortawesome/fontawesome-svg-core/import.macro";

// @flow

export default function Main({ data }) {
    const celsius = Math.round(data.main.temp - 273.15);
    const faren = Math.round((data.main.temp - 273.15) * (9 / 5) + 32);
    const feelsLike = Math.round(data.main.feels_like - 273.15);
    const visi = data.visibility / 1000;


    return (
        <div className="pt-2.5 sm:space-y-2 lg:space-y-4">
			<motion.div
				initial={{ opacity: 0, scale: 0}}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.5 }}
		  >
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("temperature-low")} fade />
                <div>
                    {celsius}&deg;C/{faren}&deg;F
                </div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("thermometer")} fade />
                <div>Feels Like:{feelsLike}&deg;C</div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("fan")} fade />
                <div>Humidity: {data.main.humidity}%</div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("eye")}  fade />
                <div>Visibility: {visi}km</div>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon icon={solid("wind")} fade />
                <div>{data.main.pressure}hPa</div>
            </div>
			</motion.div>
        </div>
    );
}
