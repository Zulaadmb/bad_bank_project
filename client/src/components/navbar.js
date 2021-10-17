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
    console.log(props.user);
    if (props.user === null) {
        return(
            <nav class="navbar navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}>
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar w/ text</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/CreateAccount/">Create Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Login/">Login</a>
                        </li>
                </ul>
                </div>
            </div>
            </nav>
        );        


    }
    else {
        return(

            <nav class="navbar navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Badbank</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                <a className="nav-link" href="/deposit/">Deposit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/withdraw/">Withdraw</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/balance/">Balance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/alldata/">AllData</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                    </ul>
                    <span class="navbar-text">
                        Welcome {localStorage.getItem("loggedIn")}
                    </span>
                    </div>
                </div>
                </nav>
            
            // <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#e3f2fd"}}> 
            //     <div class="container-fluid">
            //     <a className="navbar-brand" href="#">BadBank</a>
            //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            //     <span className="navbar-toggler-icon"></span>
            //     </button>
            //     <div className="collapse navbar-collapse" id="navbarNav">
            //         <ul className="navbar-nav">
            //             <li className="nav-item">
            //                 <a className="nav-link" href="/deposit/">Deposit</a>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link" href="/withdraw/">Withdraw</a>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link" href="/balance/">Balance</a>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link" href="/alldata/">AllData</a>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
            //             </li>
            //         </ul>
            //         <span class="navbar-text">
            //             Welcome {localStorage.getItem("loggedIn")}
            //         </span>
            //     </div>
            //     </div>
            // </nav>
        );
}
}

export default NavBar;