import react,{useEffect, useState} from "react";
import Axios from "axios";

function FinishedTickets(props){

    const [bugArray, setBugArray ] = useState([])

    const projectID = props.projectID

    useEffect(() => {
        
        Axios.post("http://localhost:3001/getSingleProject", {projectID}).then(function(response){  
            setBugArray(response.data.completedBugs)
        })
    },[projectID]);

    function handleRemove(event){
        const bugID = event.target.value;
        Axios.post("http://localhost:3001/removeCompletedBug", {bugID: bugID, projectID: projectID } ).then(function(response){
      
        })
        setBugArray(bugArray.filter(bug => bug._id !== bugID));
    }

    return(
        <div>
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
                    <p><b>Completed by:</b><span> {x.bugWorker}</span></p>
                    <div className="row">
                        <div className="col">
                            <button value={x._id} onClick={handleRemove}  type="button" className="bug-comp-btn">Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default FinishedTickets;