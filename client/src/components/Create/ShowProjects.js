import react,{useEffect, useState} from "react";
import Axios from "axios";
import CreateProject from "./CreateProject";
import ShowTickets from "./ShowTickets";
import { useNavigate } from "react-router-dom";
import base64 from 'base-64';




function ShowProjects(props) {

  let navigate = useNavigate()

  const [user, setUser] = useState({})
  const [projectArray, setProjectArray ] = useState([])
  const [isHidden, setHidden] = useState(false);


  const [projectID, setID] = useState("")
  
  async function populateProjectArray() {
		const req = await fetch('http://localhost:3001/getProjects', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})
    
		const data = await req.json()

		if (data.status === 'ok') {
			setProjectArray(data.projDoc) 
      setUser(data.user)     
		} else {
			alert(data.error)
		}
	}

  useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			
      const parts = token.split('.');
      let decodedToken = base64.decode(parts[1]);
      decodedToken = JSON.parse(decodedToken);
			if (!decodedToken) {
				localStorage.removeItem('token')
				navigate('/login')
			} else {
				populateProjectArray()
			}
		}else{
      navigate("/login")
    }
	}, [])
  
  function handleDelete(event){
    const projectID = event.target.value;
    const confirmation = prompt("Type 'Delete' to confirm this action:");
    if (confirmation === null){
      return;
    }else if (confirmation === "Delete") {
      Axios.post("http://localhost:3001/deleteProject", {projectID}).then(function(response){
        console.log("Project Deleted")
      })
      setProjectArray(projectArray.filter(project => project._id !== projectID));
    }else{
      alert("Something went wrong");
    }
  }
  

  function addUsers(event){
    const currentProjectID = event.target.value;
    const requestedUser = prompt("Enter user's email:");
    if (requestedUser == null){return}
    Axios.post("http://localhost:3001/addUser",{requestedUser:requestedUser,projectID:currentProjectID}).then(function(response){
      alert("New User has been added.")
    })
  }

  function removeUser(event){
    const currentProjectID = event.target.value;
    const requestedUser = prompt("Enter user's email:");
    if (requestedUser == null){return}
    Axios.post("http://localhost:3001/deleteUser",{requestedUser:requestedUser,projectID:currentProjectID}).then(function(response){
      alert("User has been removed.")
    })
  }

  function handleView(event){
    setID(event.target.value);
    setHidden(true);

  }
  function handleLogOut(){
    localStorage.removeItem('token')
		navigate('/login')
  }


  return(
    <div>
      <div hidden={isHidden}><CreateProject currentUserEmail={user.email} userArray={projectArray} setUserArray={setProjectArray} currentID={user._id} /></div>
      <div hidden={isHidden} className="ticket-container">
          <div className="row">
            <div className="col">
              <h2>Projects</h2>
            </div>
            <div className="col text-end">
              <button onClick={handleLogOut} className="my-btn">Logout</button>
            </div>
          </div>
          <br/>
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
                <button value={x._id} onClick={handleDelete}  type="button" className="bug-comp-btn">Delete</button>
              </div>
              <div className="col text-end">
                <button onClick={handleView} value={x._id} className="bug-comp-btn" type="button">View Project</button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button value={x._id} onClick={removeUser}  type="button" className="bug-comp-btn">Remove User</button>
              </div>
              <div className="col text-end">
                <button onClick={addUsers} value={x._id} className="bug-comp-btn" type="button">Add Users</button>
              </div>
            </div>

          </div>
          )}
      </div>
      { isHidden ? <div><ShowTickets user={user} setHidden={setHidden} projectID={projectID} /></div> : <div></div> }
    </div>
    
  )
}

export default ShowProjects;
