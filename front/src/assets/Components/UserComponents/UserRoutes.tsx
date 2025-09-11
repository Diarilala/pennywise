import axios from "axios";

const api = "http://localhost:3000/api";
export const registerUser = (newUser: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}) => axios.post(`${api}/auth/signup`, newUser);

export const loginUser = (user: {
    username: string;
    password: string;
}) => axios.post(`${api}/auth/login`, user, {withCredentials: true});