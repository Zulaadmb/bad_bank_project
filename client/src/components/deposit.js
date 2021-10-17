import ReactDOM from "react-dom";
import React from 'react';
import logo from './bank.png';
import {depositFund, getBalance} from '../utils/API';

const ATMDeposit = ({ onChange }) => {
  return (
    <label className="label huge"><br></br>
      Enter Deposit Amount:
      <br></br>
      <input type="number" id="deposited-amount" onChange={onChange}></input>
      <br></br><br></br>
      <input type="submit" value="Deposit Amount"></input>
      <img src=""></img>
    </label>
  );
};



const Account = (props) => {
  console.log(props.user);
  const [totalState, setTotalState] = React.useState(0);
  let transactionState = 0; // state of this transaction
  let status = `Current Balance:  $${totalState}`;
  console.log("Render Account");

  React.useEffect(() => { 
    
    if (props.user === undefined) {
      return 
    }
    // const data = {user: props.user};
    // const url = `/account/balance/${props.user}`;
    getBalance({email: props.user})
    .then((res) => {
      setTotalState(Number(res.data.docs[0].balance));
    })    
  }, [props.user]);


  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    transactionState = Number(event.target.value);
  };
  const handleSubmit = (event) => {
    setTotalState(totalState + transactionState);
    event.preventDefault();
    // const url = `/account/deposit/${props.user}/${totalState + transactionState}`;
    const data = {user: props.user, balance: totalState + transactionState};
    depositFund(data)
    .then((res) => {
      console.log("Successfully updated the balance");
    })

  //   (async () => {
  //     var res = await fetch(url);
  //     var data = await res.json();
  //     console.log(data);
  // })();
  transactionState = 0;
  };

  return (
    <div className="card mb-3" style={{maxWidth: "540px", border: "3px ridge", backgroundColor: "#669999"}}>
    <h3>Deposit Fund into your account!</h3>
    <div className="row g-0">
        <div className="col-md-4" style={{padding: "20px"}}>
        <img src={logo} className="img-fluid" alt="Responsive image" style={{marginLeft: "20px"}}></img>
        </div>
        <div className="col-md-8">
        <div className="card-body">
        <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
          <ATMDeposit onChange={handleChange}> Deposit</ATMDeposit>
        </form>
        </div>
        </div>
    </div>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <h2 id="total">{status}</h2>
    //   <ATMDeposit onChange={handleChange}> Deposit</ATMDeposit>
    // </form>
  );
};
// ========================================
// ReactDOM.render(<Account />, document.getElementById("root"));

export default Account;
