import react,{useEffect, useState} from "react";
import EditBugs from "./EditBugs";
import CreateTicket from "./CreateTicket";
import Axios from "axios";
import FinishedTickets from "./FinishedTickects";

function ShowTickets (props){

    const [ selectedProj , setProj ] = useState({})
    const [bugArray, setBugArray ] = useState([])
    const [ isWait , setWait ] = useState(false)
    const [ isHidden , setHidden ] = useState(false)

    const [toggleBtn, setBtn] = useState("View Completed Tickets")
    const [viewStatus, setView] = useState("inProgress")

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

    function handleToggle(){
        if (viewStatus === "inProgress"){
            setView("completed")
            setBtn("View tickets in progress")
        }else{
            setView("inProgress")
            setBtn("View Completed Tickets")
        }
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

    function handleComplete(event){
        const bugID = event.target.value;
        console.log(userEmail)
        const finishedBug = bugArray.filter(bug => bug._id == bugID)[0]
        console.log(finishedBug)
        Axios.post("http://localhost:3001/completeBug", { projectID,userEmail,finishedBug }).then(function(response){

        })
        setBugArray(bugArray.filter(bug => bug._id !== bugID));
    }

    function handleReturn(){
        props.setHidden(false)
    }

    return(
        <div>
            <div hidden={isHidden}><CreateTicket currentProj={selectedProj} userArray={bugArray} setUserArray={setBugArray} userEmail={userEmail} /></div>
            <div hidden={isHidden} className="ticket-container">
                <div className="row">
                    <div hidden={isHidden}><button onClick={handleReturn} className="return-btn">Return to Projects</button></div>
                    <div className="col-8"><h2>{selectedProj.projectName}</h2></div>
                    <div className="col-4 text-end"><button onClick={handleToggle} className="return-btn">{toggleBtn}</button></div>
                    
                    {viewStatus === "inProgress" ? bugArray.map((x, index) => 
                    <div key={index} className="bugComp">
                        <div className="row">
                        <div className="col-9">
                            <h5>{x.bugName}</h5>
                        </div>
                        <div className={`col-3 border-prior ${x.bugPriority} text-end`}>
                            <h5 className={x.bugPriority}>{x.bugPriority}</h5>
                        </div>
                        </div>
                        <p>{x.bugText}</p>
                        <p>Status:<span>{x.bugStatus}</span></p>
                        <div className="row">
                            <div className="col">
                                <button style={{marginRight:"10px"}} onClick={handleDelete} value={x._id}  type="button" className="bug-comp-btn">Delete</button>
                                <button onClick={handleEdit} value={x._id} className="bug-comp-btn" type="button">Edit</button>
                            </div>
                            <div className="col text-end">
                                <button className="complete-btn" value={x._id} onClick={handleComplete}>Completed</button>
                            </div>
                        </div>
                    </div>
                    ) : <FinishedTickets projectID={projectID}/> }


                    
                </div>
            </div>
            { isHidden ? <div><EditBugs setBugArray={setBugArray} selectedProj={selectedProj} changeHidden={setHidden} userID={userID} editTicketObj={editTicketObj} ticketID={ticketID} /></div> : <div></div> }
        </div>
    )
}



export default ShowTickets;