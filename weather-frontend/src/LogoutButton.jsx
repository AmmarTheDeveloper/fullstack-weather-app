import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import endpoints from "./endpoints"
import axios from "axios"

const LogoutButton = () => {

    const [ isLoading, setIsLoading ] = useState( false );
    const navigate = useNavigate();

    async function handleLogout () {
        setIsLoading( true )
        try {
            await axios.post( endpoints.BACKEND_URL + "/auth/logout", {}, { withCredentials: true } )
            navigate( "/login" )
        } catch ( error ) {
            alert( error?.response?.data?.message || "Something went wrong while logging out" )
        } finally {
            setIsLoading( false )
        }

    }
    return (
        <>
            <button className="logout-btn" disabled={ isLoading } type="button" onClick={ handleLogout }>{ isLoading ? "Logging out..." : "Logout" }</button>
        </>
    )
}

export default LogoutButton
