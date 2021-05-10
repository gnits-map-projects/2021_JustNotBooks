import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import "./survey.css"
import swal from 'sweetalert'
class Survey extends React.Component {
    async handleSubmit(event) {
        swal("Thanks for your time!", "", "success");


        //window.location.href = "./logout";
    }
    constructor() {
        super();
        this.state = {
            textAreaValue: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ textAreaValue: event.target.value });
    }
    async handlelogOut(event) {

        swal("Logged out successfully!!", "", "success");
        await new Promise(r => setTimeout(r, 2000));
        window.location.href = "./login";
    }
    render() {
        return (
            <div className="bg">
                <h2>Rate your experience</h2>
                <ReactStars
                    count={5}
                    size={100}
                    activeColor="#ffd700"
                />
                <h4>Any suggestions...</h4>
                <textarea
                    value={this.state.textAreaValue}
                    onChange={this.handleChange}
                    rows={5}
                    cols={50}
                />
                <br /><br />
                <button onClick={this.handleSubmit} style={{ "float": "left" }}>Submit</button>
                <button style={{ "float": "right" }} onClick={this.handlelogOut}>
                   
                        Logout
                    
                </button>
            </div>
        );
    }
}
export default Survey;