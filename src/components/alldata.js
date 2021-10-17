import ReactDOM from "react-dom";
import React from 'react';


function AllData(props){
    // const ctx = React.useContext(UserContext);
    const [data, setData] = React.useState('');
    var jsonData = [];
    React.useEffect(() => {
        //fetch all accounts from API
        const url = `/account/all/${props.user}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                jsonData = data;
                setData(JSON.stringify(data));
            });
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
             
             {data && jsonData.map((transaction) => (
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