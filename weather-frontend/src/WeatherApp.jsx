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
            {/* <div className="footer-info">
                <a href="https://www.htmlhints.com/article/how-to-create-toggle-switch/93">
                    Download Source Code
                </a>{ " " }
                | Developed by{ " " }
                <a target="_blank" href="https://www.gauravghai.dev/">
                    Gaurav Ghai
                </a>{ " " }
                | Powered by{ " " }
                <a target="_blank" href="https://www.htmlhints.com/">
                    HTML HINTS
                </a>
            </div> */}
        </>
    )
}

export default WeatherApp
