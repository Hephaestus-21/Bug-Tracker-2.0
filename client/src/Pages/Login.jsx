import { useState } from "react";
import Axios from 'axios';

function CreateLogin(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleLogin(event){
    event.preventDefault();

    const response = await Axios.post("http://localhost:3001/login", {email,password});

    const data = await response.data;

    if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/user'
		} else {
			alert('Please check your username and password')
		}
  }
  
  


  return(
    <div>
      {/* If not logged in show the login form */}
      <div className="ticket-container">
        <h1>Login</h1><br/>
        <form onSubmit={handleLogin}>
          <div className="row">
              <div className="col">
                  <div className="form-group">
                      <label htmlFor="emailName"><h5>Enter Email:</h5></label><br/>
                      <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" className="create-input-css-my" id="emailName" />
                  </div><br/>
              </div>
              <div className="col">
                  <div className="form-group">
                      <label htmlFor="passwordName"><h5>Enter Password:</h5></label><br/>
                      <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" className="create-input-css-my" id="passwordName" />
                  </div><br/>
              </div>
          </div>
          <div className="row">
              <div className="col"><input className="my-btn" type="submit" value="Login"/></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateLogin;