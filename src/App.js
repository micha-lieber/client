import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/content" element={<Input />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
