import { API_KEY, API_URL } from "./config";
import React, { useState } from "react";
import Clock from "react-live-clock";

function App() {
    const { search, setSearch } = useState("");
    const { weather, setWeather } = useState({});

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
        if (e.key === "Enter") {
            fetch(`${API_URL}weather?q=${search}&units=metric&APPID=${API_KEY}`)
                .then((response) => response.json())
                .then((result) => {
                    setWeather(result);
                    setSearch("");
                    console.log(result);
                });
        }
    };

    return (
        <div className="app">
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
                <div className="location-box">
                    <div className="location">New York City, US</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                    <div className="temp">15&#176;c</div>
                    <div className="weather">Sunny</div>
                </div>
            </main>
        </div>
    );
}

export default App;
