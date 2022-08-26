import react, { useState } from "react";
import ShowTickets from "../Create/ShowTickets";
import CreateLogin from "../Create/CreateLogin";
import Axios from "axios"

function TicketLayout() {

  const [loggedIn, setLoginState] = useState(false);
  const [currentUserID, setCurrentUser] = useState("");



  return(
    <div className="">
      <CreateLogin giveID={setCurrentUser} changeLogState={setLoginState} />
      { loggedIn ? <div><ShowTickets loggedUserID={currentUserID} /></div> : 'please log in to access features' }
    </div>
  )
}

export default TicketLayout;