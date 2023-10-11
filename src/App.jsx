import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dash from "./pages/Dash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "./redux/action/accountAction";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("dataLogin")){
      dispatch(loginAction(JSON.parse(localStorage.getItem("dataLogin"))))
    }
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Dash />} />
      </Routes>
    </div>
  );
}

export default App;
