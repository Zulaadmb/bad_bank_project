import React from 'react';
import Card from './Card';

function Balance(){
    const [show, setShow]       = React.useState(true);
    const [status, setStatus]   = React.useState('');
    return(
        <Card
            bgcolor="primary"
            header="Balance"
            status={status}
            body={show ?
                <CreateFormForBalance setShow={setShow}/> : null}
        />
    )
}

function CreateFormForBalance(props){
    const [email, setEmail]         = React.useState('');
    const [amount, setAmount]   = React.useState('');
    // const ctx = React.useContext(UserContext);

    function handle(){
        console.log(email);
        // ctx.users.push({email});
        props.setShow(false);
    }

    return (<>
    
        Email <br/>
        <input type="input"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}/><br/>

        <button type="submit"
            className="btn btn-light"
            onClick={handle}>Show Balance</button>

    </>);
}

export default Balance;