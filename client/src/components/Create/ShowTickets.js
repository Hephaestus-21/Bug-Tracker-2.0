import react,{useEffect, useState} from "react";
import EditBugs from "./EditBugs";
import CreateTicket from "./CreateTicket";
import Axios from "axios";

function ShowTickets (props){

    const [ selectedProj , setProj ] = useState({})
    const [bugArray, setBugArray ] = useState([])
    const [ isWait , setWait ] = useState(false)
    const [ isHidden , setHidden ] = useState(false)

    // just for edit bugs
    const [ticketID, setTicketID] = useState("");
    const [editTicketObj, setTicketObj] = useState({});

    const userID = props.user._id
    const userEmail = props.user.email;
    const projectID = props.projectID
    

    
    if (isWait === false){
        setWait(true);
        Axios.post("http://localhost:3001/getSingleProject", {projectID}).then(function(response){  
            setProj(response.data)
            setBugArray(response.data.projectBugs)
        })
    }else{

    }

    function handleDelete(event){
        const bugID = event.target.value;
        Axios.post("http://localhost:3001/deleteBug", {bugID: bugID, projectID: projectID } ).then(function(response){
      
        })
        setBugArray(bugArray.filter(bug => bug._id !== bugID));
    } 

    function handleEdit(event){
        const bugID = (event.target.value);
        setTicketID(bugID)
        Axios.post("http://localhost:3001/getSingleProject", { projectID }).then(function(response){
            response.data.projectBugs.forEach(x => {
                if (x._id == bugID){
                    setTicketObj(x);
                    setHidden(true)
                }
            });
        })
        
    }

    return(
        <div>
            <div hidden={isHidden}><CreateTicket currentProj={selectedProj} userArray={bugArray} setUserArray={setBugArray} userEmail={userEmail} /></div>
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
            { isHidden ? <div><EditBugs setBugArray={setBugArray} selectedProj={selectedProj} changeHidden={setHidden} userID={userID} editTicketObj={editTicketObj} ticketID={ticketID} /></div> : <div></div> }
        </div>
    )
}



export default ShowTickets;