import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const SignupPage = () => {

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    /*
    useEffect(() => {
        console.log(`first: ${firstname}| last: ${lastname} | username: ${username} | email: ${email} | password: ${password}`);
        
    }, [firstname, lastname, username, password, email]);
    */

    const handleSignup = async() => {
        try{
            const newUser = {
                firstName, lastName, username, email, password
            }
            //console.log(newUser);
            const response = await fetch(`http://localhost:3000/api/auth/signup`, {
                method: 'POST',
                headers: {
                    "Content-type" : 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || 'Signup failed'}`);
            }
            
            const data = await response.json();
            console.log('Signup successful:', data);
            alert("New user created");
            navigate('/');

        } catch(err) {
            console.error(err);
            
        }
    }
    return (
        <div className="w-1/3 border-1 m-auto p-5 flex flex-col items-center ">
            <p>Welcome to pennywise!!!</p>
            <p>Please fill up the required fields</p>

            <label htmlFor="firstname">First name: 
                <input value={firstName} onChange={(e) => setFirstname(e.target.value)} className="text-center outline-0" type="text" name="firstname" id="firstname" placeholder="Your first name ..."/>
            </label>

            <label htmlFor="lastname">Last name: 
                <input value={lastName} onChange={(e) => setLastname(e.target.value)} className="text-center outline-0" type="text" name="lastname" id="lastname" placeholder="Your last name ..."/>
            </label>

            <label htmlFor="username">Username: 
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="text-center outline-0" type="text" name="username" id="username" placeholder="Your username"/>
            </label>

            <label htmlFor="email">Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="text-center outline-0" type="text" id="email" name="email" placeholder="Your email"/>
            </label>

            <label htmlFor="password">Password:
                <input value={password} onChange={(e) =>setPassword(e.target.value)} className="text-center outline-0" type="password" placeholder="Your password" name="password" id="password"/>
            </label>
            <div className="flex gap-5">
                <button 
                onClick={() => navigate("/")}
                className="bg-red-200 p-2 rounded-xl"
                >Login page</button>

                <button
                className="bg-green-200 p-2 rounded-xl"
                onClick={handleSignup}
                >
                Create user
                </button>    
            </div>
        </div>
    )
}

export default SignupPage