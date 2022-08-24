import react, { useState } from "react";
import Axios from 'axios';

function CreateTicket(props) {
  const [bugName, setBugName] = useState("");
  const [bugStatus, setBugStatus] = useState("Open");
  const [bugText, setBugText] = useState("");
  const [bugPriority, setBugPriority] = useState("Low");

  const currentUserID = props.currentID; 

  
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
    const newObjectTicket = {projectName:bugName, bugStatus:bugStatus, bugText:bugText, bugPriority:bugPriority};
    Axios.post("http://localhost:3001/createBug", {Name:bugName, Status:bugStatus, Text:bugText, Priority:bugPriority, userIDBase:currentUserID}).then(function (response) {
      console.log(response.data)
    })
    const ArrayUser = props.userArray
    console.log(newObjectTicket);
    console.log(ArrayUser);
    props.setUserArray([...ArrayUser, newObjectTicket]);
  }

  return(
    <div className="ticket-container">
      <h2>Create Ticket</h2>
      <br/>
      
        <form>
          <div className="container">
            <div className="row">
              <div className="col-8">

                {/*Project Name Input  */}
                <div className="form-group">
                  <label htmlFor="bootName"><h5>Project Name:</h5></label><br/>
                  <input onChange={nameChange} type="text" className="create-input-css-my" id="bootEmail" />
                </div><br/>
                
              </div>
              <div className="col-4">
                {/* Status Drop Down */}
                  <div className="form-group">
                    <label htmlFor="statusDrop"><h5>Status:</h5></label><br/>
                    <select onChange={statusChange} className="create-input-css-my" id="statusDrop">
                      <option>Open</option>
                      <option>Ongoing</option>
                      <option>Delayed</option>
                      <option>Overdue</option>
                      <option>Completed</option>
                    </select>
                  </div><br/>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                {/* Description TextArea */}
                <div className="form-group">
                  <label htmlFor="descArea"><h5>Text:</h5></label><br/>
                  <textarea onChange={textChange} className="create-input-css-my vert-align-my" id="descArea" cols="32" rows="3"></textarea>
                </div><br/>
              </div>
              <div className="col-4">
                {/* Priority Drop Down */}
                <div className="form-group">
                  <label htmlFor="priorityDrop"><h5>Priority:</h5></label><br/>
                  <select onChange={priorityChange} className="create-input-css-my" id="priorityDrop">
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div><br/>
              </div>

            </div>
            <div className="row"><div className="col"><button onClick={handleClick} type="button" className="my-btn">Add bug</button></div></div>
          </div>
        </form>
    </div>
  )
}

export default CreateTicket;
