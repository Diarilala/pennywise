import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './assets/Components/UserComponents/LoginForm';

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/dashboard" element/>
        </Routes>
      </Router>
  )
}

export default App
