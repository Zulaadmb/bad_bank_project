import React from 'react';
import {getAllHistory} from '../utils/API';

function AllData(props){
    // const ctx = React.useContext(UserContext);
    const [data, setData] = React.useState('');
    var jsonData = [];
    React.useEffect(() => {
        //fetch all accounts from API
        const url = `/account/all/${props.user}`;
        
        getAllHistory(props.user)
        .then((res) => {
            setData(res.data)
        })
    }, []);

    return(
        <>


        <table class="table table-success table-striped">
         <thead style={{textAlign: "center"}}>
             <h3>Transaction History</h3>
         </thead>
         <tbody>
             <tr>
                 <th>Date</th>
                 <th>Email</th>
                 <th>Balance Remaining</th>
                 <th>Transaction Type</th>
             </tr>
             
             {data && data.map((transaction) => (
                <tr>
                    <td>{transaction.timeStamp}</td>
                    <td>{transaction.email}</td>
                    <td>{transaction.balance}</td>
                    <td>{transaction.description}</td>
                </tr>
             ))}
            
         </tbody>
        </table>
   

        
        </>
        );
}

export default AllData;