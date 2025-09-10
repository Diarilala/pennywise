import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

export const registerUser = async(userData: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
}) => {
    try {
        const response = await api.post('/auth/signup', userData);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.error)
        }
    }
    catch (error) {
        console.log(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(error.response?.data?.error || 'Registration Failed');
    }
}