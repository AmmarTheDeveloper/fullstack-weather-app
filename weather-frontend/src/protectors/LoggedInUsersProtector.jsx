import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verify } from "../verify";

const LoggedInUsersProtector = ( { children } ) => {
    const [ isVerified, setIsVerified ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect( () => {
        const checkVerification = async () => {
            const verified = await verify();
            setIsVerified( verified );
            setIsLoading( false );
        };

        checkVerification();
    }, [] );

    return isLoading ? <div className="loading">Loading...</div> : ( isVerified ? children : <Navigate to="/login" /> );
};

export default LoggedInUsersProtector;
