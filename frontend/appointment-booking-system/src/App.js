import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Background from './components/background/Background.jsx';
import Home from './pages/Home.jsx';
import Calendar from './pages/calendar/Calendar.jsx';
import SignUp from './pages/login/SignUp.jsx';
import SignIn from './pages/login/SignIn.jsx';

function App() {
  return (
    <div className="App">
      <Background/>
      <BrowserRouter>      
        <Routes>
          <Route path ='/' element={<SignIn/>}></Route>
          <Route path ='/signup' element={<SignUp/>}></Route>
          <Route path ='/home' element={<Home/>}></Route>
          <Route path ='/home/appointment-booking' element={<Calendar/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
