import Axios from "axios";
import react, {useRef, useState, useEffect } from "react";



function EditBugs(props) {

  const [editName, setName] = useState(props.editTicketObj.bugName);
  const [editText, setText] = useState(props.editTicketObj.bugText);
  const [editStatus, setStatus] = useState("Open");
  const [editPriority, setPriority] = useState("Low");
  const [isEditWait, setEditWait] = useState(false)

  const ref = useRef(null);

  const ticketID = props.bugID

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
    const userId = props.userID
    const projectId = props.currentProj._id
    const editNewObject = {nameTick:editName,textTick:editText, statTick:editStatus, priorTick:editPriority}
    Axios.post("http://localhost:3001/changeBug", {currentUser:userId, projectId:projectId, editNewObject: editNewObject, bugID: ticketID }).then(function(response){
      console.log(response.data);
    })
    setEditWait(true);

   
  }


  if ( isEditWait === true ){
    const currentUser = props.userID
    const projectId = props.currentProj._id
    setEditWait(false);
    Axios.post("http://localhost:3001/getUserByID", {userID: currentUser } ).then(function(response){
      const projectArray = (response.data.projects);
      projectArray.forEach(function(element){
        if (element._id == projectId){
          props.setUserArray(element.projectBugs);
          props.changeHidden(false);
        }else{
          return
        }
      })
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
                  <label htmlFor="bootName"><h5>Project Name:</h5></label><br/>
                  <input type="text" onChange={handleNameChange} ref={ref} defaultValue={props.editTicketObj.bugName} name="project-name" className="create-input-css-my" id="bootEmail" />
                </div><br/>
                
              </div>
              <div className="col-4">
                {/* Status Drop Down */}
                  <div className="form-group">
                    <label htmlFor="statusDrop"><h5>Status:</h5></label><br/>
                    <select onChange={handleStatusChange} name="status-select"  className="create-input-css-my" id="statusDrop">
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
                  <textarea name="text-desc" onChange={handleTextChange} ref={ref} defaultValue={props.editTicketObj.bugText} className="create-input-css-my vert-align-my" id="descArea" cols="32" rows="3"></textarea>
                </div><br/>
              </div>
              <div className="col-4">
                {/* Priority Drop Down */}
                <div className="form-group">
                  <label htmlFor="priorityDrop"><h5>Priority:</h5></label><br/>
                  <select onChange={handlePriorityChange} name="priority-selec"  className="create-input-css-my" id="priorityDrop">
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div><br/>
              </div>

            </div>
            <div className="row"><div className="col"><button onClick={handleClick} type="button" className="my-btn">Edit bug</button></div></div>
          </div>
        </form>

    </div>
  )
}

export default EditBugs;