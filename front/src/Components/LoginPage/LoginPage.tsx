import { useEffect, useState } from "react";

const LoginPage = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(`Username: ${username} | Password: ${password}`);
    }, [username, password]);

    const handleLogin = async () => {
        if (username.trim() == "") {
            alert("The 'Username' field cannot be empty");
            return;
        }
        const userCredentials = {
            username: username,
            password: password
        }
        try{
            const loginRequest = await fetch('http://localhost:3000/auth/login', {
                method: "POST",
                body: JSON.stringify(userCredentials)
            })
            console.log(loginRequest);
        } catch(err) {
            console.error(err);
        }
        
    }

    

    return (
        <>
            <div className="w-1/3 border-1 m-auto p-5 flex flex-col items-center" >
                <p>Welcome to PennyWise !</p>
                <label htmlFor=""> Username: 
                    <input required value={username} onChange={(e) => setUserName(e.target.value)} type="text" name="username" id="username"/>
                </label>
                <label htmlFor="password"> Password: 
                    <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"/>
                </label>
                <div className="flex gap-5">
                    <button onClick={handleLogin} type="submit" className="bg-blue-200 p-2 rounded-2xl">Login</button>
                    <button className="bg-green-200 p-2 rounded-2xl">Sign up</button>
                </div>
            </div>
        </>
    )
}

export default LoginPage;