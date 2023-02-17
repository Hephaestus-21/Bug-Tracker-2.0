import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Login from "./Pages/Login"
import Registor from "./Pages/Registor"
import ShowProjects from "./components/Create/ShowProjects";
import { useState } from "react";


function App() {
  const [loggedIn, setLoginStatus] = useState(false)
  
  return(
    <Router>
      <Navbar loggedIn={loggedIn} setLoginStatus={setLoginStatus}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login setLoginStatus={setLoginStatus}/>}/>
        <Route path="/register" element={<Registor />}/>
        <Route path="/user" element={<ShowProjects/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;
