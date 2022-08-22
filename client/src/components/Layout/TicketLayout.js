import react, { useState } from "react";
import CreateTicket from "../Create/CreateTicket";
import ShowTickets from "../Create/ShowTickets";
import CreateLogin from "../Create/CreateLogin";
import Axios from "axios"

function TicketLayout() {

  const [loggedIn, setLoginState] = useState(false);
  const [currentUserID, setCurrentUser] = useState("");
  const [currentUserBugArray, setUserArrayBug] = useState([])



  return(
    <div className="">
      <CreateLogin UserArrayBug={setUserArrayBug} giveID={setCurrentUser} changeLogState={setLoginState} />
      { loggedIn ? <div><CreateTicket/><ShowTickets allBugsUser={currentUserBugArray} loggedUserID={currentUserID} /></div> : 'please log in to access features' }
    </div>
  )
}

export default TicketLayout;