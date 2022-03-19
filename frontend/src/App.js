import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000")

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} exact/>
            <Route path='/signup' element={<Signup/>} exact/>
            <Route path='/' element={<Home/>} exact/>
            <Route path='/chat/:room' element={<Chat socket={socket}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
