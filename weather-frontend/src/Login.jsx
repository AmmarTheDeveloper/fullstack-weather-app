import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import endpoints from "./endpoints"

const Login = () => {
  const [ user, setUser ] = useState( {
    email: '',
    password: '',
  } );
  const [ message, setMessage ] = useState( { status: '', info: '' } );
  const [ isLoading, setIsLoading ] = useState( false );
  const navigate = useNavigate();

  function validateEmail ( email ) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test( email );
  }

  // function validatePassword ( password ) {
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   return passwordRegex.test( password );
  // }

  function handleChange ( e ) {
    setUser( { ...user, [ e.target.name ]: e.target.value } );
  }

  async function handleSubmit ( e ) {
    e.preventDefault();

    if ( !user.email || !user.password ) {
      setMessage( { status: 'error', info: 'All fields are required' } );
      return;
    }

    if ( !validateEmail( user.email ) ) {
      setMessage( { status: 'error', info: 'Invalid email format' } );
      return;
    }

    // if ( !validatePassword( user.password ) ) {
    //   setMessage( {
    //     status: 'error',
    //     info: 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
    //   } );
    //   return;
    // }

    setIsLoading( true )
    try {

      await axios.post( endpoints.BACKEND_URL + "/auth/login", {
        email: user.email,
        password: user.password,
      }, { withCredentials: true } )

      setMessage( { status: 'success', info: 'Logged in successfully' } );
      setUser( { email: "", password: "" } )

      setTimeout( () => navigate( "/" ), 2000 )
    } catch ( error ) {
      console.log( error )
      const msg = error?.response?.data?.message || "Something went wrong while logging in";

      setMessage( { status: 'error', info: msg } );
    } finally {
      setIsLoading( false )
    }
  }

  return (
    <div className="form-container" style={ { marginTop: "100px" } }>
      <h1>Login</h1>

      { message.info && (
        <div style={ { marginBottom: "15px" } } className={ message.status === 'error' ? 'alert-danger' : 'alert-success' }>
          { message.info }
        </div>
      )
      }

      <form onSubmit={ handleSubmit }>

        <div>
          <label htmlFor="email">Enter email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={ user.email }
            onChange={ handleChange }
          />
        </div>

        <div>
          <label htmlFor="password">Enter password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={ user.password }
            onChange={ handleChange }
          />
        </div>

        <div style={ { marginTop: "10px", marginBottom: "10px", color: "white" } }>
          Don't have an account? <Link to="/register" style={ { color: "lightblue" } }>Register</Link>
        </div>

        <input type="submit" disabled={ isLoading } value={ isLoading ? "Logging in..." : "Login" } />
      </form>
    </div >
  );
};

export default Login;
