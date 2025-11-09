const express = require( 'express' )
const User = require( "../models/user" )

const router = express.Router();

router.post( "/register", async ( req, res ) => {
    const { name, email, password } = req.body;

    if ( !name || !email || !password ) {
        return res.status( 400 ).json( { message: "All fields are required" } );
    }

    try {
        const userExists = await User.findOne( { email } );
        if ( userExists ) {
            return res.status( 400 ).json( { message: "Email already registered" } );
        }

        const newUser = new User( { name, email, password } );
        await newUser.save();

        res.status( 201 ).json( { message: "User registered successfully" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Server error", error } );
    }
} );

router.post( "/login", async ( req, res ) => {
    const { email, password } = req.body;

    if ( !email || !password ) {
        return res.status( 400 ).json( { message: "All fields are required" } );
    }

    try {
        const user = await User.findOne( { email } );
        if ( !user ) {
            return res.status( 400 ).json( { message: "Invalid credentials" } );
        }

        if ( password != user.password ) {
            return res.status( 400 ).json( { message: "Invalid credentials" } );
        }

        req.session.user = { id: user._id, name: user.name, email: user.email };

        res.status( 200 ).json( { message: "Login successful", user: req.session.user } );
    } catch ( error ) {
        res.status( 500 ).json( { message: "Server error", error } );
    }
} );

router.post( "/logout", ( req, res ) => {
    req.session.destroy( ( err ) => {
        if ( err ) {
            return res.status( 500 ).json( { message: "Logout failed" } );
        }
        res.clearCookie( "connect.sid" );
        res.status( 200 ).json( { message: "Logout successful" } );
    } );
} );

router.get( "/verify", ( req, res ) => {
    if ( req.session.user ) {
        res.status( 200 ).json( { isAuthenticated: true, user: req.session.user } );
    } else {
        res.status( 401 ).json( { isAuthenticated: false, message: "User not logged in" } );
    }
} );

module.exports = router;