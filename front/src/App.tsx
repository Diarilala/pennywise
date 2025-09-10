import './App.css'
import ExpenseSection from './Components/ExpenseSection'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateExpenseSection from './Components/CreateExpenseSection'
import EditExpense from './Components/EditExpense'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<ExpenseSection />}>
        </Route>  
        <Route path='create' element={<CreateExpenseSection />} />
        <Route path=':id/edit'element={<EditExpense /> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
