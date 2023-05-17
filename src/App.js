import "./App.css";
import Login from "./components/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import Home from "./pages/Home";
import ForgotPwd from "./components/user/ForgotPwd";
import ResetPassword from "./components/user/ResetPassword";
import VerifyToken from "./components/user/VerifyToken";
import Product from "./pages/Product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password/forgot" element={<ForgotPwd />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/password/verify" element={<VerifyToken />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
