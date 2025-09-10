import './App.css'
import ExpenseSection from './Components/ExpenseSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateExpenseSection from './Components/CreateExpenseSection'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<ExpenseSection />}>
        </Route>  
        <Route path='create' element={<CreateExpenseSection />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
