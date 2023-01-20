import react,{useEffect, useState} from "react";
import Axios from "axios";
import CreateProject from "./CreateProject";
import EditBugs from "./EditBugs";
import ShowTickets from "./ShowTickets";




function ShowProjects(props) {

  const user = props.loggedUser
  const [projectArray, setProjectArray ] = useState([])
  const [isHidden, setHidden] = useState(false);


  const [projectID, setID] = useState("")
  
  // just for edit bugs

  useEffect(() => {
    const userEmail = user.email
    Axios.post("http://localhost:3001/getUserProjects", {userEmail}).then(function(response){
    setProjectArray(response.data)
    // const newObjectTicket = (projectArray[projectArray.length - 1]);
    //   const ArrayUser = props.userArray;
    //   props.setUserArray([...ArrayUser, newObjectTicket]);
  })

  }, []);
  


  // function handleDelete(event){
  //   const bugId = event.target.value;
  //   Axios.post("http://localhost:3001/deleteBug", {bugID: bugId, currentUserID: userID} ).then(function(response){
  
  //   })
  //   setProjectArray(projectArray.filter(bug => bug._id !== bugId));
  // }

  // function handleEdit(event){
  //   setID(event.target.value);
  //   Axios.post("http://localhost:3001/getUserByID", { userID:userID }).then(function(response){
  //     response.data.projects.map(function(x, index){
  //       if (x._id === event.target.value){
  //         setObj(response.data.projects[index]);
  //         setHidden(true);
  //       }else {
  //         console.log("Still looking for bug")

  //       }

  //     });
  //   })
  //   window.scrollTo(0, document.body.scrollHeight);
  // }
    function addUsers(event){
      const currentProjectID = event.target.value
      const requestedUser = prompt("Enter user's email:");
      console.log(requestedUser);
      Axios.post("http://localhost:3001/addUser",{requestedUser:requestedUser,projectID:currentProjectID}).then(function(response){
        alert("New User has been added.")
      })
    }

    function handleView(event){
      setID(event.target.value);
      setHidden(true);

    }


  return(
    <div>
      <div hidden={isHidden}><CreateProject currentUserEmail={user.email} userArray={projectArray} setUserArray={setProjectArray} currentID={user._id} /></div>
      <div hidden={isHidden} className="ticket-container">
          <h2>Projects</h2><br/>
          {projectArray.map((x, index) => 
          <div key={index} className="bugComp">
            <div className="row">
              <div className="col-5">
                <h5>{x.projectName}</h5>
              </div>
              <div className={`col-7 text-end`}>
                <h5>Owner:{x.projectOwner}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
              <button value={x._id}  type="button" className="bug-comp-btn">Delete</button>
              </div>
              <div className="col text-end">
                <button onClick={handleView} value={x._id} className="bug-comp-btn" type="button">View Project</button>
              </div>
            </div>
            <div className="row">
              <div className="col text-end">
                <button onClick={addUsers} value={x._id} className="bug-comp-btn" type="button">Add Users</button>
              </div>
            </div>

          </div>
          )}
      </div>
      { isHidden ? <div><ShowTickets user={user} projectID={projectID} /></div> : <div></div> }
      {/* { isHidden ? <div><EditBugs setUserArray={setBugArray} changeHidden={setHidden} userID={userID} editProjObj={editProjObj} bugID={ticketBugID} /></div> : <div></div> } */}
    </div>
    
  )
}

export default ShowProjects;
