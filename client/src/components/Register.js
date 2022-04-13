import react, { useState } from "react";
import Axios from "axios"

function Register(){

    const [createdUser,setCreatedUser] = useState({Fname:"", Lname:"", Email:"", Password:""})



    function handleClick(event){
      console.log(createdUser)
    }

    function handleChange(event){
      const { value, name } = event.target;

      setCreatedUser(prevValue => {
        if (name === "Fname") {
          return {
            FName: value,
            LName: prevValue.LName,
            Email:prevValue.Email,
            Password:prevValue.Password

          };
        } else if (name === "Lname") {
          return {
            FName: prevValue.Fname,
            LName: value,
            Email:prevValue.Email,
            Password:prevValue.Password
          };
        } else if (name === "Email") {
          return {
            FName: prevValue.Fname,
            LName: prevValue.LName,
            Email:value,
            Password:prevValue.Password
          };
        } else if (name === "Password") {
          return {
            FName: prevValue.Fname,
            LName: prevValue.LName,
            Email: prevValue.Email,
            Password:value
          };
        }
      });

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
                  <input type="text" name="Fname" value={createdUser.Fname} onChange={handleChange} className="form-control" placeholder="First Name"></input>
                </div>
                <div className="col">
                  <input type="text" name="Lname" value={createdUser.Lname} onChange={handleChange} className="form-control" placeholder="Last Name"></input>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input type="email" name="Email" value={createdUser.Email} onChange={handleChange} className="form-control" placeholder="Email"></input>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input type="password" name="Password" value={createdUser.Password} onChange={handleChange} className="form-control" placeholder="Password"></input>
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