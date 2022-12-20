import react,{useEffect, useState} from "react";
import Axios from "axios";
import CreateProject from "./CreateProject";
import EditBugs from "./EditBugs";
import OneProject from "./OneProject";




function ShowProjects(props) {

  const userID = props.loggedUserID
  const [projectArray, setProjectArray ] = useState([])
  const [isHidden, setHidden] = useState(false);

  const [projectID, setID] = useState("")
  
  // just for edit bugs
  const [editProjObj, setObj] = useState({});

  useEffect(() => {
    Axios.post("http://localhost:3001/getUserByID", {userID} ).then(function(response){
      setProjectArray(response.data.projects)
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

    function handleView(event){
      setID(event.target.value);
      setHidden(true);

    }


  return(
    <div>
      <div hidden={isHidden}><CreateProject userArray={projectArray} setUserArray={setProjectArray} currentID={userID} /></div>
      <div hidden={isHidden} className="ticket-container">
          <h2>Projects</h2><br/>
          {projectArray.map((x, index) => 
          <div key={index} className="bugComp">
            <div className="row">
              <div className="col-9">
                <h5>{x.projectName}</h5>
              </div>
              <div className={`col-3 text-end`}>
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

          </div>
          )}
      </div>
      { isHidden ? <div><OneProject changeHidden={setHidden} userID={userID} projectID={projectID} /></div> : <div></div> }
      {/* { isHidden ? <div><EditBugs setUserArray={setBugArray} changeHidden={setHidden} userID={userID} editProjObj={editProjObj} bugID={ticketBugID} /></div> : <div></div> } */}
    </div>
    
  )
}

export default ShowProjects;
