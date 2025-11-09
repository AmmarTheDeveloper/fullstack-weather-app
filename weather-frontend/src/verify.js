import axios from 'axios';
import endpoints from "./endpoints"

export async function verify () {
    try {
        const response = await axios.get( endpoints.BACKEND_URL + "/auth/verify", { withCredentials: true } );
        return response.data.isAuthenticated;
    } catch ( error ) {
        console.error( "Verification failed:", error );
        return false;
    }
}
