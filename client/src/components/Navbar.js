import react from "react";
import Axios from "axios"



function Navbar(props) {

  const user = props.currentUser;
  const loggedIn = props.loggedIn;

  function handleLogOut(){
    props.setLoginState(false);
    props.setCurrentUser("");
  }

  return(
    <div className="my-navbar">
      <div className="row">
        <div className="col-8"><h2>Bug Tracker</h2></div>
        {loggedIn ? <div className="col-4 text-end"><h2>Hello, {user.fname}!</h2><button onClick={handleLogOut} type="button" className="my-btn">Log Out</button></div> : <div></div>}
                    
      </div>
    </div>
  )
}

export default Navbar;
