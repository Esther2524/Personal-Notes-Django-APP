import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

/*
 * This compoenent is designed to conditionally render child components based on whether the user is authorized. 
 * It uses an access token stored in local storage to determine authorization status and handles token refresh when necessary. 
 * This component handles protected routes in a React application that relies on JWT for authentication
*/
function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  /*
   * useEffect to Run Authorization Check: Executes the auth() function once on component mount. 
   * If authentication fails (caught by .catch()), setIsAuthorized is set to false.
  */
  useEffect(() => {
    // If an exception is thrown, setIsAuthorized(false) is executed
    auth().catch(() => setIsAuthorized(false))
  }, [])

  // Retrieves the refresh token from local storage.
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      // Makes a POST request to the /api/token/refresh/ endpoint with the refresh token.
      // This api is the Axios instance we creared in the `api.js` file
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken
      });
      // If the response is successful (HTTP 200), it updates the local storage with the new access token and sets isAuthorized to true.
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      }
      
    } catch (error) {
      setIsAuthorized(false)
      
    }
  }

  // Retrieves the access token from local storage.
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    // If no token is found, sets isAuthorized to false.
    if (!token) {
      setIsAuthorized(false)
      return
    }
    // If a token is found, decodes it to get the expiration date.
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000 // date in seconds

    // Compares the token's expiration date with the current date/time
    // If the token has expired (tokenExpiration < now), calls refreshToken() to try to renew the access token.
    if (tokenExpiration < now) {
      await refreshToken()
    } else {
      // If the token is still valid, sets isAuthorized to true.
      setIsAuthorized(true)
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }


  return (
    isAuthorized ? children : <Navigate to="/login" />
  )
}

export default ProtectedRoute