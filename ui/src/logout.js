import { Redirect } from "react-router-dom";
import React from "react";

class logout extends React.Component{
    constructor(props){
        super(props);
        //console.log("in Logout")
        sessionStorage.clear();
        //UserProfile.clear();
    }
    render(){
        var ans = window.confirm("Are you sure to logout? ");
        if (ans==true)
            return(<Redirect to="/login"/>);
        else
            return(<Redirect to="/home"/>);
                          
        }
       
}

export default logout;

