function Logout(props){
    props.setUser("")
    window.location.replace("/#/login");
}