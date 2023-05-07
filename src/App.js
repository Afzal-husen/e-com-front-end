import "./App.css";
import Login from "./components/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
