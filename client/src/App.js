import {useState, useEffect} from "react";
import Axios from "axios";
import Navbar from "./components/Navbar"
import CreateTicket from "./components/Create/CreateTicket";
import TicketLayout from "./components/Layout/TicketLayout";
import Footer from "./components/Footer"


function App() {

  
  return(
    <div>
      <Navbar/>
      <TicketLayout/>
      <Footer/>
    </div>
  )
}

export default App;
