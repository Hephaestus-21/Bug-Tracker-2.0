import react from "react";
import Axios from "axios"
import {Link, useNavigate} from "react-router-dom"



function Navbar(props) {

  let navigate = useNavigate()
  

  return(
    <div className="my-navbar">
      <div className="row">
        <div className="col-6"><h2>Bug Tracker</h2></div>
        <div className="col-6 navbar-btn">
          <button className="return-btn" onClick={()=>{navigate("/")}} style={{marginRight:"10px"}}>Home</button>
          <button className="return-btn" onClick={()=>{navigate("/login")}} style={{marginRight:"10px"}}>Login</button>
          <button className="return-btn" onClick={()=>{navigate("/register")}} style={{marginRight:"10px"}} >Register</button>
          <button className="return-btn" onClick={()=>{navigate("/user")}} >Projects</button>
        </div>
                    
      </div>
    </div>
  )
}

export default Navbar;
