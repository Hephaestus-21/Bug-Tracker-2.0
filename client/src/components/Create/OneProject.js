import react,{useEffect, useState} from "react";
import CreateTicket from "./CreateTicket";
import Axios from "axios";

function OneProject (props){

    const [ selectedProj , setProj ] = useState({})
    const [bugArray, setBugArray ] = useState([])
    const [ isWait , setWait ] = useState(false)

    const userID = props.userID

    
    if (isWait === false){
        Axios.post("http://localhost:3001/getUserByID", {userID:userID}).then(function(response){
            response.data.projects.map(function(x, index){
                if (props.projectID === x._id){
                    setProj(x)
                    setBugArray(x.projectBugs)
                    setWait(true);
                }else{
                    console.log("Not found")
                }
            })
        })
    }else{

    }

    function handleDelete(event){
        const bugId = event.target.value;
        console.log(bugId)
        Axios.post("http://localhost:3001/deleteBug", {bugID: bugId, currentUserID: userID, currentProjID: selectedProj } ).then(function(response){
      
        })
        // setProjectArray(projectArray.filter(bug => bug._id !== bugId));
    } 

    return(
        <div>
            <CreateTicket currentProj={selectedProj} userArray={bugArray} setUserArray={setBugArray} currentID={userID} />
            <div className="ticket-container">
                <div className="row">
                    <div className="col-8"><h2>{selectedProj.projectName}</h2></div>
                    <div className="col-4"><h2>Owner:{selectedProj.projectOwner}</h2></div>
                    {bugArray.map((x, index) => 
                    <div key={index} className="bugComp">
                        <div className="row">
                        <div className="col-9">
                            <h5>{x.bugName}</h5>
                        </div>
                        <div className={`col-3 ${x.bugPriority} text-end`}>
                            <h5 className={x.bugPriority}>{x.bugPriority}</h5>
                        </div>
                        </div>
                        <p>{x.bugText}</p>
                        <p>Status:<span>{x.bugStatus}</span></p>
                        <div className="row">
                            <div className="col">
                                <button onClick={handleDelete} value={x._id}  type="button" className="bug-comp-btn">Delete</button>
                            </div>
                            {/* <div className="col text-end">
                                <button value={x._id} className="bug-comp-btn" type="button">Edit</button>
                            </div> */}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}



export default OneProject;