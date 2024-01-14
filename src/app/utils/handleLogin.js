import axios from "axios";
import setAuthToken from "./setAuthToken";

const handleLogin = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password });
        if (response.status === 200) {
            localStorage.setItem('jwtToken', response.data.token);
            localStorage.setItem('email', response.data.userData.email);
            localStorage.setItem('expiration', response.data.tokenExpiration);
            localStorage.setItem('userData', JSON.stringify(response.data.userData));
            // Call setAuthToken to set the token in Axios headers
            setAuthToken(response.data.token);
            console.log('Login successful');
        } else {
            console.log('Login failed, code:', response.status);
            // Handle login failure, e.g., show an error message
        }
    } catch (error) {
        console.error('Login error:', error);
        // Handle other errors, e.g., network issues or server errors
    }
};

export default handleLogin;
