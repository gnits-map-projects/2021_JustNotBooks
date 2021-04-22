import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import "./survey.css"
class Survey extends React.Component {
    handleSubmit(event) {
        alert('Thank you for your time!');
        window.location.href = "./logout";
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
                <button onClick={this.handleSubmit} style={{ "float": "left" }}>< a class="p" href="/logout">Submit</a></button>
                <button style={{ "float": "right" }}> < a class="p" href="/logout">Logout</a></button>
            </div>
        );
    }
}
export default Survey;