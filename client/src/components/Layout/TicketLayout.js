import react, { useState } from "react";
import ShowProjects from "../Create/ShowProjects";
import CreateLogin from "../Create/CreateLogin";
import CreateRegistor from "../Create/CreateRegistor";
import Navbar from "../Navbar";

function TicketLayout() {

  const [loggedIn, setLoginState] = useState(false);
  const [isHide, setHide] = useState(true);
  const [currentUser, setCurrentUser] = useState("");



  return(
    <div className="">
      <Navbar loggedIn={loggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} setLoginState={setLoginState} />
      <div hidden={!isHide}><CreateRegistor setHide={setHide} giveUser={setCurrentUser} changeLogState={setLoginState} /></div>
      { !loggedIn ? <div hidden={isHide}><CreateLogin setHide={setHide} giveUser={setCurrentUser} changeLogState={setLoginState} /></div> : <div></div>}
      { loggedIn ? <div><ShowProjects loggedUser={currentUser} /></div> : <div></div> }
    </div>
  )
}

export default TicketLayout;