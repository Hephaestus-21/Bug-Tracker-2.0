import react,{useState} from "react";
import Axios from "axios";

function CreateRegistor(props){

    const [newFName, setFName] = useState("");
    const [newLName, setLName] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    function handleRegister(event){
        const newUserDoc = {fname:newFName,lname:newLName,email:newEmail,password:newPassword}
        Axios.post("http://localhost:3001/createNewUser", {newUserDoc}).then(function(response){
            console.log(response);
            props.setHide(false)
        })
    }
    
    function handleAccount(){
        props.setHide(false)
    }


    return(
        <div className="ticket-container">
            <h1>Register</h1><br/>
            <form>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="firstName"><h5>Enter First Name:</h5></label><br/>
                            <input onChange={function(event){setFName(event.target.value)}} type="text" className="create-input-css-my" id="firstName" />
                        </div><br/>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="lastName"><h5>Enter Last Name:</h5></label><br/>
                            <input onChange={function(event){setLName(event.target.value)}} type="text" className="create-input-css-my" id="lastName" />
                        </div><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="newemailName"><h5>Enter Email:</h5></label><br/>
                            <input onChange={function(event){setEmail(event.target.value)}} type="email" className="create-input-css-my" id="newemailName" />
                        </div><br/>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="newpasswordName"><h5>Enter Password:</h5></label><br/>
                            <input onChange={function(event){setNewPassword(event.target.value)}} type="password" className="create-input-css-my" id="newpasswordName" />
                        </div><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col"><button onClick={handleRegister} type="button" className="my-btn">Register</button></div>
                    <div className="col"><button onClick={handleAccount} type="button" className="my-btn">Already have an account</button></div>
                </div>
            </form>
        </div>
    )
}


export default CreateRegistor;