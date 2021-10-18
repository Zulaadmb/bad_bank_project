import ReactDOM from "react-dom";
import React from 'react';
import logo from './bank.png';
import {withrawFund, getBalance} from '../utils/API';

const ATMWithraw = ({ onChange }) => {
    return (
      <label className="label huge"><br></br>
        Enter Withraw Amount:
        <br></br>
        <input type="number" onChange={onChange}></input>
        <br></br><br></br>
        <input type="submit" value="Withdraw Amount"></input>
        <img src=""></img>
        
      </label>
    );
  };

  const AccountWithdraw = (props) => {
    console.log(props.user);
    const [totalState, setTotalState] = React.useState(0);
    let transactionState = 0; // state of this transaction
    let status = `Current Balance:  $${totalState}`;
    console.log("Render Account");
    const handleChange = event => {
      console.log(`handleChange ${event.target.value}`);
      transactionState = Number(event.target.value);
    };
    const handleSubmit = (event) => {
      if (totalState < transactionState) {
          alert("You don't have enough fund!")
      }
      else {
        setTotalState(totalState - transactionState);
        event.preventDefault();
        const data = {user: props.user, balance: totalState - transactionState};
        withrawFund(data)
        .then((res) => {
          console.log("Fund withdraw successful ", res.data);
        })
    }
    };
  
    React.useEffect(() => { 
    
      if (props.user === undefined) {
        return 
      }
      getBalance({email: props.user})
      .then((res) => {
        setTotalState(Number(res.data.docs[0].balance));
      })
    }, [props.user]);
  
  
    return (
        <div className="card mb-3" style={{maxWidth: "540px", border: "3px ridge", backgroundColor: "#669999"}}>
        <h3>Withdraw Fund from your account!</h3>
        <div className="row g-0">
            <div className="col-md-4" style={{padding: "20px"}}>
            <img src={logo} className="img-fluid" alt="Responsive image" style={{marginLeft: "20px"}}></img>
            </div>
            <div className="col-md-8">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <h2 id="total">{status}</h2>
                <ATMWithraw onChange={handleChange}> Withdraw</ATMWithraw>
            </form>
            </div>
            </div>
        </div>
        </div>
    );
  };
  // ========================================

  export default AccountWithdraw;
  