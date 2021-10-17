import React from 'react';
import NavBar from '../src/components/navbar';
import Login from '../src/components/login';
import CreateAccount from '../src/components/createaccount';
import AllData from '../src/components/alldata';
import Account from '../src/components/deposit';
import AccountWithdraw from '../src/components/withdraw';
import Balance from '../src/components/balance';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

export default function App (){
  const [user, setUser] = React.useState();

  React.useEffect(() => { 
      const url = `/account/info`;
      (async () => {
        var res = await fetch(url);
        var data = await res.json();
        console.log("User is ", data);
        setUser(data.user);
    })();
      
    }, []);
  
  return ( //<NavBar/>
    <div className='App'>
      <Router>
      
           <NavBar user={user} setUser={setUser}/>

              <div className="container" style={{padding: "70px"}}>
                <Switch>
                  <Route exact path="/" component={() => <Login setUser={setUser} />} />
                  <Route path="/CreateAccount/" component={CreateAccount} />
                  <Route path="/alldata/" component={() => <AllData user={user} />}  />
                  <Route path="/login" component={() => <Login setUser={setUser} />}  />
                  <Route path="/Deposit/" component={() => <Account user={user} />}/>
                  <Route path="/Withdraw/" component={() => <AccountWithdraw user={user} />}/>
                  <Route path="/Balance/" component={Balance} />
                </Switch>
              </div>
      
      </Router>
      </div>  
  )
}