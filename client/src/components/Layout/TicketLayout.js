import react from "react";
import CreateTicket from "../Create/CreateTicket";
import ShowTickets from "../Create/ShowTickets";

function TicketLayout() {



  return(
    <div className="container-fluid">
        <div className="row row-height">
          <div className="col">
            <CreateTicket/>
          </div>
          <div className="col right">
            <ShowTickets/>
          </div>
        </div>
        <div className="row">
          <div className="col">
          
          </div>
        </div>
    </div>
  )
}

export default TicketLayout;