import react,{useEffect, useState} from "react";
import EditBugs from "./EditBugs";
import CreateTicket from "./CreateTicket";
import Axios from "axios";

function OneProject (props){

    const [ selectedProj , setProj ] = useState({})
    const [bugArray, setBugArray ] = useState([])
    const [ isWait , setWait ] = useState(false)
    const [ isHidden , setHidden ] = useState(false)

    // just for edit bugs
    const [ticketBugID, setID] = useState("");
    const [editTicketObj, setObj] = useState({});

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
        setBugArray(bugArray.filter(bug => bug._id !== bugId));
    } 

    function handleEdit(event){
        const bugId = (event.target.value);
        Axios.post("http://localhost:3001/getUserByID", { userID:userID }).then(function(response){
            response.data.projects.map(x => {
                if (x._id === selectedProj._id){
                    x.projectBugs.map(x => {
                        if(x._id == bugId){
                            setID(x._id)
                            setObj(x)
                            setHidden(true)
                    }})
                }
            })
        })
        
    }

    return(
        <div>
            <div hidden={isHidden}><CreateTicket currentProj={selectedProj} userArray={bugArray} setUserArray={setBugArray} currentID={userID} /></div>
            <div hidden={isHidden} className="ticket-container">
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
                            <div className="col text-end">
                                <button onClick={handleEdit} value={x._id} className="bug-comp-btn" type="button">Edit</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            { isHidden ? <div><EditBugs setUserArray={setBugArray} currentProj={selectedProj} changeHidden={setHidden} userID={userID} editTicketObj={editTicketObj} bugID={ticketBugID} /></div> : <div></div> }
        </div>
    )
}



export default OneProject;