// This file configures an Axios instance to handle HTTP requests
// Usage: You can use this api instance in your React components to make authenticated API calls.

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";


/*
 * The api object is an Axios instance 
 * Then when we make a HTTP request, we can simply use api.get(), api.post(), api.put(), api.delete().
*/
const api = axios.create({
    // Environment variables must begin with REACT_APP_ in their names.
    baseURL: process.env.REACT_APP_BASE_API_URL
})


/* 
 * Axios interceptors allow you to run your code or modify the request and response objects right before they are sent or after they are received.
 * Token Retrieval: Before any request is sent, it retrieves the ACCESS_TOKEN from localStorage. This token is expected to be a JWT (JSON Web Token) that you store after a user logs in.
 * Authorization Header: If a token exists, it sets the Authorization header to Bearer ${token}
*/
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api