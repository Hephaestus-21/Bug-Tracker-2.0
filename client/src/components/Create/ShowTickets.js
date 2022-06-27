import react,{useEffect, useState} from "react";
import Axios from "axios";



function ShowTickets() {

  const [bugArray, setBugArray] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllBugs").then(function(response){
      setBugArray(response.data);
    })
  })

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
        <h3>Bugs</h3>
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
          <p>Status: {x.bugStatus}</p>
          <div className="row">
            <div className="col">
            <button onClick={handleDelete} value={x._id} type="button" className="btn btn-info">Delete</button>
            </div>
            <div className="col text-end">
              <a href="http://localhost:3001/editBug"><button onClick={handleEdit} value={x._id} className="btn btn-info" type="button">Edit</button></a>
            </div>
          </div>

        </div>
        )}
    </div>
  )
}

export default ShowTickets;
