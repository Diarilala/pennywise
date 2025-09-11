import {registerUser} from "./UserRoutes.tsx";
import {type JSX, useState} from "react";

interface RegisterProps {
    onLoginClick: () => void;
}

export default function Register({onLoginClick}: RegisterProps): JSX.Element {
    const [newUser, setNewUser ] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleRegisterUser = async () => {
        console.log("Button clicked")
        try {
            await registerUser(newUser);
            setNewUser({firstName: "", lastName: "", username: "", email: "", password: "", confirmPassword: ""});
            return {
                status: 200,
                message: 'success'
            }
            
        } catch (error: any) {
            const backenderror = error.response?.data?.error;
            return backenderror
        }
    }

    return (
        <div className="bg-[url(abstract4.jpg)] p-15 rounded-[40px]">
            <div className="w-[100%] flex justify-end py-1">
                <p
                onClick={onLoginClick} 
                className="font-normal text-lg font-sans p-2 hover:cursor-pointer hover:bg-neutral-300/20 rounded-2xl">Already have an account?</p>
            </div>
            <div className="bg-neutral-300/20 backdrop-blur-[2px] backdrop-brightness-[1.1] h-[530px] w-[882px] flex items-center justify-center flex-col rounded-[20px] drop-shadow-md gap-4">
            <h1>
                <p className="text-6xl text-[#9370db]">Create your account</p>
            </h1>

            <div className="rounded-2xl h-[50%] w-[80%] flex flex-col items-center justify-around font-sans">
                <div className="flex gap-20">
                    <div className="flex flex-col w-[250px] h-[70px] bg-white rounded-[10px]">
                        <p className="text-2xl">First Name</p>
                        <input 
                        className="placeholder:text-center flex justify-center items-center text-center h-10 font-sans rounded-[10px]"
                        type="text"
                        placeholder="Your first name"
                        value={newUser.firstName}
                        onChange={(c) => setNewUser({...newUser, firstName: c.target.value})}
                        required
                        />
                    </div>
                    <div className="flex flex-col w-[250px] h-[70px] bg-white rounded-[10px]">
                        <p className="text-2xl">Last Name</p>
                        <input 
                        className="placeholder:text-center flex justify-center items-center text-center h-10 font-sans rounded-[10px]"
                        type="text"
                        placeholder="Your last name"
                        value={newUser.lastName}
                        onChange={(c) => setNewUser({...newUser, lastName: c.target.value})}
                        required
                        />
                    </div>
                </div>
                <div className="flex gap-20">
                    <div className="flex flex-col w-[250px] h-[70px] bg-white rounded-[10px]">
                    <p className="text-2xl">Username</p>
                    <input 
                    className="placeholder:text-center flex justify-center items-center text-center h-10 font-sans rounded-[10px]"
                    type="text"
                    placeholder="How should we call you"
                    value={newUser.username}
                    onChange={(c) => setNewUser({...newUser, username: c.target.value})} 
                    required
                    />
                    </div>
                    <div className="flex flex-col w-[250px] h-[70px] bg-white rounded-[10px]">
                    <p className="text-2xl">Email</p>
                    <input
                    className="placeholder:text-center flex justify-center items-center text-center h-10 font-sans rounded-[10px]"
                    type="email"
                    placeholder="Your email here" 
                    value={newUser.email}
                    onChange={(c) => setNewUser({...newUser, email: c.target.value})}
                    required
                    />
                    </div>
                </div>
                <div className="flex flex-col w-[250px] h-[70px] bg-white rounded-[10px]">
                    <p className="text-2xl">Password</p>
                    <input
                    className="placeholder:text-center flex justify-center items-center text-center h-10 font-sans rounded-[10px]"
                    type="password"
                    placeholder="Your password here"
                    value={newUser.password}
                    onChange={(c) => setNewUser({...newUser, password: c.target.value})}
                    required
                    />
                </div>
            </div>
            
            <div className="font-sans text-white w-[140px] h-[40px] flex justify-center items-center bg-black rounded-[10px] hover:bg-gray-800 ease-in-out duration-150 cursor-pointer">Register</div>
        </div>
        </div>
    )
}