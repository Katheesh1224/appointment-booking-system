import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login/Login.jsx';
import Background from './components/background/Background.jsx';
import Home from './Home.jsx';
import Calendar from './calendar/Calendar.jsx';

function App() {
  return (
    <div className="App">
      <Background/>
      {/* <Home/> */}
      <BrowserRouter>      
        <Routes>
          <Route path ='/' element={<Login/>}></Route>
          <Route path ='/home' element={<Home/>}></Route>
          <Route path ='/home/appointment-booking' element={<Calendar/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
