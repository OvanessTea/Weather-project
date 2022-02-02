import { API_KEY, API_URL } from "./config";
import React, { useState } from "react";

function App() {
    const { search, setSearch } = useState("");
    const { weather, setWeather } = useState({});

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
            <header className="header__search">
                <input
                    type="text"
                    className="search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => pressKeyDown(e)}
                />
            </header>
        </div>
    );
}

export default App;
