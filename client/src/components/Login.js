import {useState, useEffect} from "react";



function Login(props) {  


  function registerClick(){
    props.changeStateFn("Register")
  }


  return (
    <div>

        <div className="logBody">
          <div className="login-title">
            <h3>Bug Tracker</h3>
            <p>Login or register</p>
          </div>
        </div>

        <div className="center-login-comp">
          <form>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label">Email address:</label>
              <input type="email" className="form-control" id="=InputEmail"/>
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label">Password:</label>
              <input type="password" className="form-control" id="InputPassword"/>
            </div>
          </form>
          <br/>
          <div className="container">
            <div className="row">
              <p onClick={registerClick} className="col-8">Register new account</p>
              <button type="button" className="col-4 btn btn-primary btn-sm">Login</button>
            </div>
          </div>
        </div>



    </div>
  );
}

export default Login;
