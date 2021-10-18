import baseStyling from './nav.css';
function NavBar(props){

    const handleLogout = () => {
        props.setUser("");
        const url = `/account/logout`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
      })();
        localStorage.clear();
        window.location.replace("/");
    }


    //


    //
    console.log(props.user);
    if (props.user === null) {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Badbank</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/CreateAccount/">Create Account</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/Login/">Login</a>
                </li>
                </ul>
            </div>
            </nav>
        );        


    }
    else {
        return(

            <nav className="navbar navbar-expand-lg navbar navbar-light" style={{opacity: "0.8", backgroundColor: "#e3f2fd"}}>
            <a className="navbar-brand" href="#">Badbank</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/deposit/">Deposit</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/withdraw/">Withdraw</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/alldata/">Transaction History</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" onClick={handleLogout}>Logout</a>
                </li>
                </ul>
                <span className="navbar-text">
                    Welcome {localStorage.getItem("loggedUser")}
                </span>
            </div>
            </nav>
        );
}
}

export default NavBar;