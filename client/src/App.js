import React from 'react';
import NavBar from '../src/components/navbar';
import Login from '../src/components/login';
import CreateAccount from '../src/components/createaccount';
import AllData from '../src/components/alldata';
import Account from '../src/components/deposit';
import AccountWithdraw from '../src/components/withdraw';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {getUserInfo} from '../src/utils/API';
import background from './components/background.jpeg';

export default function App (){
  const [user, setUser] = React.useState();

  React.useEffect(() => { 
      const url = `/account/info`;
      getUserInfo()
      .then((res) => {
        // setUser(res.data.user);
        const email = localStorage.getItem("loggedUser");
        setUser(email);
        console.log("User set to ", user);
      })
    }, []);


    
    
    
  return ( //<NavBar/>
    <div className='App' style={{ backgroundImage: `url(${background})`, position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -70%)', width: '80%', height: '80%', fontFamily: "Alfa Slab One"}}>
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
                </Switch>
              </div>
      
      </Router>
      </div>  
  )
}