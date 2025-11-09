const express = require( 'express' )
const session = require( "express-session" )
const cors = require( "cors" );
const dotenv = require( "dotenv" );
const connectDB = require( "./config" );
const authRoutes = require( "./routes/auth" );

dotenv.config();

const app = express();

app.use( express.json() );
app.use( cors( { origin: "http://localhost:5173", credentials: true } ) );
app.use(
    session( {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    } )
);

connectDB();

app.use( "/auth", authRoutes );

const PORT = process.env.PORT || 5000;
app.listen( PORT, () => console.log( `Server running on port ${ PORT }` ) );
