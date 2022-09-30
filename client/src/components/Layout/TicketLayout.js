import react, { useState } from "react";
import ShowTickets from "../Create/ShowTickets";
import CreateLogin from "../Create/CreateLogin";
import CreateRegistor from "../Create/CreateRegistor";

function TicketLayout() {

  const [loggedIn, setLoginState] = useState(false);
  const [currentUserID, setCurrentUser] = useState("");



  return(
    <div className="">
      <CreateRegistor />
      <div ><CreateLogin giveID={setCurrentUser} changeLogState={setLoginState} /></div>
      { loggedIn ? <div><ShowTickets loggedUserID={currentUserID} /></div> : 'please log in to access features' }
    </div>
  )
}

export default TicketLayout;