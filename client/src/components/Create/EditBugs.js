import Axios from "axios";
import react, {useRef, useState } from "react";



function EditBugs(props) {

  const [editName, setName] = useState(props.editTicketObj.bugName);
  const [editText, setText] = useState(props.editTicketObj.bugText);
  const [editStatus, setStatus] = useState(props.editTicketObj.bugStatus);
  const [editPriority, setPriority] = useState(props.editTicketObj.bugPriority);
  const [isEditWait, setEditWait] = useState(false)

  const ref = useRef(null);


  const ticketID = props.ticketID
  const projectID = props.selectedProj._id

  function handleNameChange(event){
    setName(event.target.value)
  }
  function handleTextChange(event){
    setText(event.target.value)
  }

  function handleStatusChange(event){
    setStatus(event.target.value)
  }
  function handlePriorityChange(event){
    setPriority(event.target.value)
  }
  
  function handleClick(){
    const editNewObject = {nameTick:editName,textTick:editText, statTick:editStatus, priorTick:editPriority}
    Axios.post("http://localhost:3001/changeBug", {editNewObject: editNewObject, bugID: ticketID }).then(function(response){
      setEditWait(true);
    })

   
  }

  function handleReturn(){
    props.changeHidden(false);
  }


  if ( isEditWait == true ){
    setEditWait(false);
    Axios.post("http://localhost:3001/getSingleProject", {projectID} ).then(function(response){
      props.setBugArray(response.data.projectBugs);
      props.changeHidden(false);
    });
    // used to change back to previous page
  } else{
    
  }
  

  return(
    <div className="ticket-container">
        <h2>Edit Ticket</h2>
      <br/>
      
        <form id="editFormID">
          <div className="container">
            <div className="row">
              <div className="col-8">

                {/*Project Name Input  */}
                <div className="form-group">
                  <label htmlFor="bootName"><h5>Ticket Name:</h5></label><br/>
                  <input type="text" onChange={handleNameChange} ref={ref} defaultValue={props.editTicketObj.bugName} name="project-name" className="create-input-css-my" id="bootEmail" />
                </div><br/>
                
              </div>
              <div className="col-4">
                {/* Status Drop Down */}
                  <div className="form-group">
                    <label htmlFor="statusDrop"><h5>Status:</h5></label><br/>
                    <select onChange={handleStatusChange} name="status-select"  className="create-input-css-my" id="statusDrop">
                      <option value="none" selected disabled hidden>{props.editTicketObj.bugStatus}</option>
                      <option>Open</option>
                      <option>Ongoing</option>
                      <option>Delayed</option>
                      <option>Overdue</option>
                    </select>
                  </div><br/>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                {/* Description TextArea */}
                <div className="form-group">
                  <label htmlFor="descArea"><h5>Text:</h5></label><br/>
                  <textarea name="text-desc" onChange={handleTextChange} ref={ref} defaultValue={props.editTicketObj.bugText} className="create-input-css-my vert-align-my" id="descArea" cols="32" rows="3"></textarea>
                </div><br/>
              </div>
              <div className="col-4">
                {/* Priority Drop Down */}
                <div className="form-group">
                  <label htmlFor="priorityDrop"><h5>Priority:</h5></label><br/>
                  <select onChange={handlePriorityChange} name="priority-selec"  className="create-input-css-my" id="priorityDrop">
                    <option value="none" selected disabled hidden>{props.editTicketObj.bugPriority}</option>
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div><br/>
              </div>

            </div>
            <div className="row">
              <div className="col"><button onClick={handleClick} type="button" className="my-btn">Edit bug</button></div>
              <div className="col"><button onClick={handleReturn} type="button" className="my-btn">Cancel</button></div>
            </div>
          </div>
        </form>

    </div>
  )
}

export default EditBugs;