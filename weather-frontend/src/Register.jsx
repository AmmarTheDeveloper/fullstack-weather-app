import axios from 'axios';
import React, { useState } from 'react';
import endpoints from './endpoints';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [ user, setUser ] = useState( {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  } );
  const [ message, setMessage ] = useState( { status: '', info: '' } );
  const [ isLoading, setIsLoading ] = useState( false );
  const navigate = useNavigate();

  function validateEmail ( email ) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test( email );
  }

  function validatePassword ( password ) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test( password );
  }

  function handleChange ( e ) {
    setUser( { ...user, [ e.target.name ]: e.target.value } );
  }

  async function handleSubmit ( e ) {
    e.preventDefault();

    if ( !user.name || !user.email || !user.password || !user.confirmPassword ) {
      setMessage( { status: 'error', info: 'All fields are required' } );
      return;
    }

    if ( !validateEmail( user.email ) ) {
      setMessage( { status: 'error', info: 'Invalid email format' } );
      return;
    }

    if ( !validatePassword( user.password ) ) {
      setMessage( {
        status: 'error',
        info: 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
      } );
      return;
    }

    if ( user.password !== user.confirmPassword ) {
      setMessage( {
        status: 'error',
        info: 'Password and confirm password must be the same',
      } );
      return;
    }


    setIsLoading( true )
    try {

      await axios.post( endpoints.BACKEND_URL + "/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      }, { withCredentials: true } )

      setMessage( { status: 'success', info: 'Registration successful' } );
      setUser( { name: "", email: "", password: "", confirmPassword: "" } )

      setTimeout( () => navigate( "/login" ), 2000 )
    } catch ( error ) {
      const msg = error?.response?.data?.message || "Something went wrong while registeration";

      setMessage( { status: 'error', info: msg } );
    } finally {
      setIsLoading( false )
    }

  }

  return (
    <div className="form-container">
      <h1>Register</h1>

      { message.info && (
        <div style={ { marginBottom: "15px" } } className={ message.status === 'error' ? 'alert-danger' : 'alert-success' }>
          { message.info }
        </div>
      )
      }

      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="name">Enter name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={ user.name }
            onChange={ handleChange }
          />
        </div>

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

        <div>
          <label htmlFor="confirmPassword">Enter confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter confirm password"
            value={ user.confirmPassword }
            onChange={ handleChange }
          />
        </div>

        <div style={ { marginTop: "10px", marginBottom: "10px", color: "white" } }>
          Already have an account? <Link to="/login" style={ { color: "lightblue" } }>Login</Link>
        </div>

        <input type="submit" disabled={ isLoading } value={ isLoading ? "Registering..." : "Register" } />      </form>
    </div >
  );
};

export default Register;
