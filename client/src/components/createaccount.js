import React from 'react';
import logo from './bank.png';
import {signup} from '../utils/API';

function CreateAccount(){
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState('');
    return(
        <div className="card mb-3" style={{maxWidth: "540px", border: "3px ridge", backgroundColor: "#669999"}}>
        <h3>Welcome to Online Banking!</h3>
        <div className="row g-0">
            <div className="col-md-4" style={{padding: "20px"}}>
            <img src={logo} className="img-fluid" alt="Responsive image" style={{marginLeft: "20px"}}></img>
            </div>
            <div className="col-md-8">
            <div className="card-body">
            {show ?                                        
                <CreateForm setShow={setShow}/> : 
                <CreateMsg setShow={setShow}/>}
            </div>
            </div>
        </div>
        </div>
    )
}
function CreateMsg(props){
    return(<>
        <h5>You have successfully created your account.</h5>
        <button type="submit"
            className="btn btn-light"
            onClick={() => props.setShow(true)}>Add another account</button>
        </>);
}


function CreateForm(props){
    const [name, setName]           = React.useState('');
    const [email, setEmail]         = React.useState('');
    const [password, setPassword]   = React.useState('');
    //const ctx = React.useContext(UserContext);

    function handle(){
        console.log(name,email,password);
        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            alert("Please enter complete information");
            return
        }
        const data = {
                      name: name, 
                      email: email, 
                      password: password
                    }

        signup(data)
        .then((res) => {
            console.log(res);
            if (('code' in res.data) && (res.data.code === "error")) {
                alert("The account is already taken");
            }
            else {
                alert("Account created successfully");
                props.setShow(false);
                window.location.replace("/Login");
            }
        })           
    }

    return (<>
        Name<br/>
        <input type="input"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.currentTarget.value)}/><br/>

        Email address<br/>
        <input type="input"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}/><br/>

        Password<br/>
        <input type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}/><br/>

        <button
            className="btn btn-primary"
            onClick={handle}>Create Account</button>

    </>);
}

export default CreateAccount;