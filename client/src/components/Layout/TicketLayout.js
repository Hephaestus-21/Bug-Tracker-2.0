import react, { useState } from "react";
import ShowProjects from "../Create/ShowProjects";
import CreateLogin from "../Create/CreateLogin";
import CreateRegistor from "../Create/CreateRegistor";

function TicketLayout() {

  const [loggedIn, setLoginState] = useState(false);
  const [isHide, setHide] = useState(true);
  const [currentUserID, setCurrentUser] = useState("");



  return(
    <div className="">
      <div hidden={!isHide}><CreateRegistor setHide={setHide} /></div>
      <div hidden={isHide}><CreateLogin setHide={setHide} giveID={setCurrentUser} changeLogState={setLoginState} /></div>
      { loggedIn ? <div><ShowProjects loggedUserID={currentUserID} /></div> : 'please log in to access features' }
    </div>
  )
}

export default TicketLayout;