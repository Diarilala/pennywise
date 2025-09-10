import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './Components/LoginPage/LoginPage'
import SignupPage from './Components/LoginPage/SignupPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
