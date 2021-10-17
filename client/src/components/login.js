import { getDefaultNormalizer } from '@testing-library/react';
import React from 'react';
import UserContext from 'react';
import logo from './bank.png';

function Login(props){
    const [show, setShow]       = React.useState(true);
    return(<>
            <div className="card mb-3" style={{maxWidth: "540px", border: "3px ridge", backgroundColor: "#669999"}}>
                <h3>Welcome to Online Banking!</h3>
                <div className="row g-0">
                    <div className="col-md-4" style={{padding: "20px"}}>
                    <img src={logo} className="img-fluid" alt="Responsive image" style={{marginLeft: "20px"}}></img>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">
                    {show ?
                        <CreateFormForLogin setShow={setShow} setUser={props.setUser}/> : null}
                    </div>
                    </div>
                </div>
                </div>
        {/* <Card
            bgcolor="primary"
            header="Login"
            status={status}
            body={show ?
                <CreateFormForLogin setShow={setShow} setUser={props.setUser}/> : null}
        /> */}
        </>
        )
}

function CreateFormForLogin(props){
    const [email, setEmail]         = React.useState('');
    const [password, setPassword]   = React.useState('');
   const ctx = React.useContext(UserContext);

    function createAccount() {
        window.location.replace("/CreateAccount");
    }
    function handleLogin(){
        console.log(email,password);
        ctx.users.push({email,password});
        props.setShow(false);
        const url = `/account/login/${email}/${password}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
            if (data.code === "success") {
                props.setUser(email);
                window.location.replace("/deposit");
            }
            else {
                alert("Login unsuccessful");
                window.location.replace("/CreateAccount/");
            }

        })();
    }

    return (<>
        Email <br/>
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
        <button type="button"
            className="btn btn-primary"
            onClick={handleLogin} style={{margin: "5px"}}>Login</button>

        <button type="button"
            className="btn btn-primary"
            onClick={createAccount} style={{marginLeft: "30px"}}>Create Account</button>
    </>);
}

export default Login;