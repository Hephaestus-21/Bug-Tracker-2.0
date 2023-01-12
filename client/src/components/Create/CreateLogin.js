import react, { useState } from "react";
import Axios from 'axios';

function CreateLogin(props) {

  const [userEmail, setEmail] = useState("");
  const  [userPassword, setPassword] = useState("");
  const [isLogHidden, setHidden] = useState(false);
  const [isWelcHidden, setWelcHidden] = useState(true);
  const [userFullName, setFullName]= useState(["",""])

  const userObject = {email: userEmail, password: userPassword};

  function handleEmailChange(event){
    setEmail(event.target.value);
  };
  function handlePasswordChange(event){
    setPassword(event.target.value);
  };

  function handleClick(){
    console.log(userObject)
    Axios.post("http://localhost:3001/getUserLogin", userObject).then(function (response){

      // gets id of the user requested, which will then later be used to get all the bugs for that user
      if (typeof response.data == "object"){
        const tempHoldID = response.data._id;
        props.giveID(tempHoldID);

        setFullName([response.data.fname,response.data.lname])
        setHidden(true);
        setWelcHidden(false);
        props.changeLogState(true);
      }else{
        alert("Wrong email or password.")
      }
    })
  }
  
  
  function handleAccount(){
    props.setHide(true)
  }


  return(
    <div>
      {/* If not logged in show the login form */}
      <div hidden={isLogHidden} className="ticket-container">
        <h1>Login</h1><br/>
        <form>
          <div className="row">
              <div className="col">
                  <div className="form-group">
                      <label htmlFor="emailName"><h5>Enter Email:</h5></label><br/>
                      <input onChange={handleEmailChange} type="email" className="create-input-css-my" id="emailName" />
                  </div><br/>
              </div>
              <div className="col">
                  <div className="form-group">
                      <label htmlFor="passwordName"><h5>Enter Password:</h5></label><br/>
                      <input onChange={handlePasswordChange} type="password" className="create-input-css-my" id="passwordName" />
                  </div><br/>
              </div>
          </div>
          <div className="row">
              <div className="col"><button onClick={handleClick} type="button" value={userObject} className="my-btn">Login</button></div>
              <div className="col"><button onClick={handleAccount} type="button" className="my-btn">Create an Account?</button></div>
          </div>
        </form>
      </div>
      {/* if logged in show user's name */}
      <div hidden={isWelcHidden} className="ticket-container">
        <h1>Welcome, {userFullName[0]} {userFullName[1]} !</h1>
      </div>
    </div>
  )
}

export default CreateLogin;