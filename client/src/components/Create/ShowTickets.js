import react,{useEffect, useState} from "react";
import Axios from "axios";



function ShowTickets(props) {

  const userID = props.loggedUserID
  const bugArray = props.allBugsUser

  
  


  function handleDelete(event){
    const bugId = (event.target.value)
    Axios.post("http://localhost:3001/deleteBug", {bugId} ).then(function(response){
      console.log(response);
      window.location.reload()
    })
  }

  function handleEdit(event){
    const bugEdit = event.target.value
    Axios.post("http://localhost:3001/editBugID",{bugEdit}).then(function(response){
      console.log("ollo")
    })
  }


  return(
    <div className="ticket-container">
        <h2>Bugs</h2><br/>
        {bugArray.map((x, index) => 
        <div key={index} className="bugComp">
          <div className="row">
            <div className="col-9">
              <h5>{x.projectName}</h5>
            </div>
            <div className={`col-3 ${x.bugPriority} text-end`}>
              <h5 className={x.bugPriority}>{x.bugPriority}</h5>
            </div>
          </div>
          <p>{x.bugText}</p>
          <p>Status:<span>{x.bugStatus}</span></p>
          <div className="row">
            <div className="col">
            {/* CANNOT PUT value={x._id} due to not having an id */}
            <button onClick={handleDelete}  type="button" className="bug-comp-btn">Delete</button>
            </div>
            <div className="col text-end">
              <a href="http://localhost:3001/editBug"><button onClick={handleEdit} value={x._id} className="bug-comp-btn" type="button">Edit</button></a>
            </div>
          </div>

        </div>
        )}
    </div>
  )
}

export default ShowTickets;
