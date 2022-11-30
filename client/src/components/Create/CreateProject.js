import react, { useState } from "react";
import Axios from 'axios';

function CreateProject(props) {
  const [projectName, setProjectName] = useState("");
  const [projectOwner, setProjectOwner] = useState("");

  const [isWait, setWait] = useState(false);
  // for database to create ticket


  const currentUserID = props.currentID; 

  
  function nameChange(event){
    setProjectName(event.target.value)
  }
  
  function ownerChange(event){
    setProjectOwner(event.target.value)
  }
  

  function handleClick(){

    Axios.post("http://localhost:3001/createProject", {name:projectName, owner:projectOwner, userIDBase:currentUserID}).then(function (res) {
      console.log("Bug created in the backend.")
      console.log(res.data);
      setWait(true);
      // Axios.post("http://localhost:3001/getUserTickets", {userID: currentUserID} ).then(function(response){
      //   const projectArray = (response.data.projects);
      //   console.log(projectArray)
      //   console.log(projectArray.length)
      //   const newObjectTicket = (projectArray[projectArray.length - 1]);
      //   const ArrayUser = props.userArray;
      //   props.setUserArray([...ArrayUser, newObjectTicket]);
      // });
      
    });
  }

  // if ( isWait === true ){
  //   setWait(false);
  //   Axios.post("http://localhost:3001/getUserByID", {userID: currentUserID} ).then(function(response){
  //     const projectArray = (response.data.projects);
  //     console.log(projectArray)
  //     console.log(projectArray.length)
  //     const newObjectTicket = (projectArray[projectArray.length - 1]);
  //     const ArrayUser = props.userArray;
  //     props.setUserArray([...ArrayUser, newObjectTicket]);
  //   });
  // } else{

  // }

  return(
    <div className="ticket-container">
      <h2>Create Project</h2>
      <br/>
      
        <form>
          <div className="container">
            <div className="row">
              <div className="col-6">

                {/*Project Name Input  */}
                <div className="form-group">
                  <label htmlFor="bootName"><h5>Project Name:</h5></label><br/>
                  <input onChange={nameChange} type="text" className="create-input-css-my" id="bootEmail" />
                </div><br/>
                
              </div>
              <div className="col-6">
                {/* Project Owner Input */}
                <div className="form-group">
                  <label htmlFor="bootOwner"><h5>Project Owner:</h5></label><br/>
                  <input onChange={ownerChange} type="text" className="create-input-css-my" id="bootOwner" />
                </div><br/>
              </div>
            </div>
            <div className="row"><div className="col"><button onClick={handleClick} type="button" className="my-btn">Create Project</button></div></div>
          </div>
        </form>
    </div>
  )
}

export default CreateProject;
