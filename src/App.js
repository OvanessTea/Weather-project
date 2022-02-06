import { API_KEY, API_URL } from "./config";
import React, { useState } from "react";
import Clock from "react-live-clock";

function App() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [backgroundImage, setBackgroundImage] = useState("app");

    const dateBuilder = (dateInfo) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        let day = days[dateInfo.getDay()];
        let date = dateInfo.getDate();
        let month = months[dateInfo.getMonth()];
        let year = dateInfo.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    };

    const pressKeyDown = (e) => {
        if (e.key === "Enter" && search !== "") {
            fetch(`${API_URL}weather?q=${search}&units=metric&APPID=${API_KEY}`)
                .then((response) => response.json())
                .then((result) => {
                    setWeather(result);
                    setSearch("");
                    switch (result.weather[0].main) {
                        case "Clouds":
                            setBackgroundImage("app clouds");
                            break;
                        case "Snow":
                            setBackgroundImage("app winter");
                            break;
                        case "Clear":
                            setBackgroundImage("app clear");
                            break;
                        case "Smoke":
                            setBackgroundImage("app smoke");
                            break;
                        default:
                            setBackgroundImage("app");
                    }
                });
        }
    };

    return (
        <div className={backgroundImage}>
            <main className="main">
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => pressKeyDown(e)}
                    />
                    <Clock
                        format={"HH:mm"}
                        className="clocks"
                        ticking={true}
                        timezone={"Europe/Moscow"}
                    />
                </div>
                {typeof weather.main !== "undefined" ? (
                    <>
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}&#176;c
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </main>
        </div>
    );
}

export default App;
