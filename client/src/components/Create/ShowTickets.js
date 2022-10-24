import react,{useEffect, useState} from "react";
import Axios from "axios";
import CreateTicket from "../Create/CreateTicket";
import EditBugs from "./EditBugs";




function ShowTickets(props) {

  const userID = props.loggedUserID
  const [bugArray, setBugArray ] = useState([])
  const [isHidden, setHidden] = useState(false);


  
  // just for edit bugs
  const [ticketBugID, setID] = useState("")
  const [editProjObj, setObj] = useState({});

  useEffect(() => {
    Axios.post("http://localhost:3001/getUserTickets", {userID} ).then(function(response){
      setBugArray(response.data.projects)
    })
  }, []);
  


  function handleDelete(event){
    const bugId = event.target.value;
    Axios.post("http://localhost:3001/deleteBug", {bugID: bugId, currentUserID: userID} ).then(function(response){
  
    })
    setBugArray(bugArray.filter(bug => bug._id !== bugId));
  }

  function handleEdit(event){
    setID(event.target.value);
    Axios.post("http://localhost:3001/getSpecificTicket", {ticketID:event.target.value , userId:userID }).then(function(response){
      response.data.projects.map(function(x, index){
        if (x._id === event.target.value){
          setObj(response.data.projects[index]);
          setHidden(true);
        }else {
          console.log("Still looking for bug")

        }

      });
    })
    window.scrollTo(0, document.body.scrollHeight);
  }


  return(
    <div>
      <div hidden={isHidden}><CreateTicket userArray={bugArray} setUserArray={setBugArray} currentID={userID} /></div>
      <div hidden={isHidden} className="ticket-container">
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
              <button onClick={handleDelete} value={x._id}  type="button" className="bug-comp-btn">Delete</button>
              </div>
              <div className="col text-end">
                <button onClick={handleEdit} value={x._id} className="bug-comp-btn" type="button">Edit</button>
              </div>
            </div>

          </div>
          )}
      </div>
      { isHidden ? <div><EditBugs setUserArray={setBugArray} changeHidden={setHidden} userID={userID} editProjObj={editProjObj} bugID={ticketBugID} /></div> : <div></div> }
    </div>
    
  )
}

export default ShowTickets;
