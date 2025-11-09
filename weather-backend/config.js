const mongoose = require( 'mongoose' )
const dotenv = require( "dotenv" )

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.MONGO_URI, );
        console.log( "Database Connected" );
    } catch ( error ) {
        console.error( "Database Connection Failed", error );
        process.exit( 1 );
    }
};

module.exports = connectDB;
