import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './Components/LoginPage/LoginPage'
import SignupPage from './Components/LoginPage/SignupPage'
import Dashboard from './Components/Dashboard/Dashboard'
import ExpenseSection from './Components/Expense/ExpenseSection'
import Categories from './Components/Categories/Categories.tsx'
import Profile from './Components/Profile/Profile'
import CreateExpenseSection from './Components/Expense/CreateExpenseSection.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/expense' element={<ExpenseSection />}></Route>
        <Route path='/expense/create' element={<CreateExpenseSection />}></Route>
        <Route path='/categories' element={<Categories />}></Route>
        <Route path='/profile' element ={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
