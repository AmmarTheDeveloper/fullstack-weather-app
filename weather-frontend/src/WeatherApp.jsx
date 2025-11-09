import React from 'react'
import CurrentLocation from "./currentLocation";
import LogoutButton from "./LogoutButton"

const WeatherApp = () => {
    return (
        <>
            <LogoutButton />
            <div className="container">
                <CurrentLocation />
            </div>
            <div className="footer-info">
                Developed by{ " " }
                <a target="_blank" href="https://www.gauravghai.dev/">
                    Gaurav Ghai
                </a>{ " " }
                | Backend, Authentication done by{" "}
                <a target="_blank" href="https://github.com/ammarthedeveloper">
                    AmmarTheDeveloper
                </a>
            </div>
        </>
    )
}

export default WeatherApp
