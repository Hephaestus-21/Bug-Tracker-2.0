import react, { useState } from "react";
import Axios from 'axios';

function CreateTicket() {
  const [bugName, setBugName] = useState("");
  const [bugStatus, setBugStatus] = useState("Open");
  const [bugText, setBugText] = useState("");
  const [bugPriority, setBugPriority] = useState("Low");

  
  function nameChange(event){
    setBugName(event.target.value)
  }
  
  function statusChange(event){
    setBugStatus(event.target.value)
  }
  function textChange(event){
    setBugText(event.target.value)
  }

  function priorityChange(event){
    setBugPriority(event.target.value)
  }

  function handleClick(){
    console.log({Name:bugName, Status:bugStatus, Text:bugText, Priority:bugPriority})
    Axios.post("http://localhost:3001/createBug", {Name:bugName, Status:bugStatus, Text:bugText, Priority:bugPriority}).then(function (response) {
      console.log(response);
    })
    window.location.reload()
  }

  return(
    <div className="ticket-container">
        <form>
          {/*Project Name Input  */}
          <div className="form-group">
            <label htmlFor="bootName"><h5>Project Name:</h5></label>
            <input onChange={nameChange} type="text" className="form-control" id="bootEmail" placeholder="Project Name"/>
          </div>
          {/* Status Drop Down */}
          <div className="form-group">
            <label htmlFor="statusDrop"><h5>Status:</h5></label>
            <select onChange={statusChange} className="form-select" id="statusDrop">
              <option>Open</option>
              <option>Ongoing</option>
              <option>Delayed</option>
              <option>Overdue</option>
              <option>Completed</option>
            </select>
          </div>
          {/* Description TextArea */}
          <div className="form-group">
            <label htmlFor="descArea"><h5>Text:</h5></label>
            <textarea onChange={textChange} className="form-control" id="descArea" rows="3"></textarea>
          </div>
          {/* Priority Drop Down */}
          <div className="form-group">
            <label htmlFor="statusDrop"><h5>Priority:</h5></label>
            <select onChange={priorityChange} className="form-select" id="statusDrop">
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
          
          <button onClick={handleClick} type="button" className="btn btn-dark">Add bug</button>
        </form>
    </div>
  )
}

export default CreateTicket;
