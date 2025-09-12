import { loginUser } from "./UserRoutes.tsx";
import {type JSX, useState} from "react";

export default function Login({onSignUpClick}):JSX.Element {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        console.log("button clicked");
        try {
            await loginUser(user);
            setUser({username: "", password: ""});
            return {
                status: 200,
                message: 'success'
            }
        } catch (error: any) {
            const backenderror = error.response?.data?.error || "Login failed";
            return backenderror

        }
    }
    return (
        <div className="bg-[url(abstract4.jpg)] p-15 rounded-[40px]">
            <div className="w-[100%] flex justify-end py-1">
                <p 
                onClick={onSignUpClick}
                className="font-normal text-lg font-sans p-2 hover:cursor-pointer hover:bg-neutral-300/20 rounded-2xl">No account yet?</p>
            </div>
            <div className="bg-neutral-300/20 backdrop-blur-[2px] backdrop-brightness-[1.1] h-[530px] w-[882px] flex items-center justify-center flex-col rounded-[20px] drop-shadow-md gap-4">
            <h1>
                <p className="text-6xl text-[#9370db]">Log in to your account</p>
            </h1>

            <div className="rounded-2xl h-[50%] w-[80%] flex flex-col items-center justify-around font-sans">
                <div className="flex gap-20 flex-col">
                    <div className="flex flex-col w-[450px] h-[70px] bg-white rounded-[10px] items-center justify-center">
                        <p className="text-2xl">First Name</p>
                        <input 
                        className="placeholder:text-center flex justify-center items-center text-center h-10 font-sans rounded-[10px]"
                        type="text"
                        placeholder="Your first name"
                        value={user.username}
                        onChange={(c) => setUser({...user, username: c.target.value})}
                        required
                        />
                    </div>
                    <div className="flex flex-col w-[450px] h-[70px] bg-white rounded-[10px] items-center justify-center">
                        <p className="text-2xl">Last Name</p>
                        <input 
                        className="placeholder:text-center flex justify-center items-center text-center h-10 font-sans rounded-[10px]"
                        type="text"
                        placeholder="Your last name"
                        value={user.password}
                        onChange={(c) => setUser({...user, password: c.target.value})}
                        required
                        />
                    </div>
                </div>
            </div>
            
            <div className="font-sans text-white w-[140px] h-[40px] flex justify-center items-center bg-black rounded-[10px] hover:bg-gray-800 ease-in-out duration-150 cursor-pointer">Log in</div>
        </div>
        </div>
    )
};

