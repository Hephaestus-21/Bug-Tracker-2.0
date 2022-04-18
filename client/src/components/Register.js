import react, { useState } from "react";
import Axios from "axios"

function Register(){

    const [listOfUsers ,setListOfUsers ] = useState([])
    const [fname , setFname] = useState("")
    const [lname , setLname] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")


    function handleClick(){
      Axios.post("http://localhost:3001/createUser", {fname:fname, lname:lname, email:email,password:password}).then(function(response){
        setListOfUsers([...listOfUsers,{fname, lname, email, password}])
      })
    }



    return(
      <div>

        <div className="logBody">
          <div className="login-title">
            <h3>Bug Tracker</h3>
            <p>Login or register</p>
          </div>
        </div>


        <div className="regis-comp">
          <div className="container">
            <h4>Sign Up</h4>
            <form>
              <div className="row">
                <div className="col">
                  <input type="text" name="Fname" onChange={(event) => {setFname(event.target.value)}} className="form-control" placeholder="First Name"></input>
                </div>
                <div className="col">
                  <input type="text" name="Lname" onChange={(event) => {setLname(event.target.value)}} className="form-control" placeholder="Last Name"></input>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input type="email" name="Email" onChange={(event) => {setEmail(event.target.value)}} className="form-control" placeholder="Email"></input>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input type="password" name="Password" onChange={(event) => {setPassword(event.target.value)}} className="form-control" placeholder="Password"></input>
                </div>
              </div>
              <button onClick={handleClick} type="button" className="col-4 reg-btn b tn btn-primary btn-sm">Sign Up</button>
            </form> 
          </div>
        </div>


      </div>
    )
}

export default  Register;