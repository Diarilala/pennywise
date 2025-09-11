import { useState } from 'react'
import Register from './Register'
import Index from './Index';
import Login from './Login';

export default function LoginForm() {
    const [activeScreen, setActiveScreen] = useState("index");
    
      return (
          <div className='flex flex-col justify-center items-center'>
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              activeScreen === "index" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
              <Index 
              onSignUpClick={() => setActiveScreen("register")}
              onLoginClick={() => setActiveScreen("login")}
              />
            </div>
            <div className={`absolute transition-opacity duration-700 ${
              activeScreen === "index" || activeScreen === "login" ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}>
              <Register
              onLoginClick={() => setActiveScreen("login")}
                />
            </div>
            <div className={`absolute transition-opacity duration-700 ${
                activeScreen === "index" || activeScreen ==="register" ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}>
              <Login 
              onSignUpClick={() => setActiveScreen("register")}
              />
            </div>
          </div>
      )
}