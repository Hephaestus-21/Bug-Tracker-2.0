import {useState, useEffect} from "react";
import Axios from "axios";
import Login from "./components/Login"
import Footer from "./components/Footer"
import Register from "./components/Register"



function App() {

  const [currentState,setCurrentState] = useState("Login")

  return (
    <div>
      {(currentState === "Login" ? <Login changeStateFn={setCurrentState} /> : <Register/> )}
      <Footer />
    </div>
  );
}

export default App;
