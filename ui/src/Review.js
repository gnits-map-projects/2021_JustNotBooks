import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import "./Review.css"
import Nav from "./Nav.js"
import item from "./Seller.js"

class Feedback extends React.Component {

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
            <div className="Review" >
                 <h2> <center>Reviews</center></h2>
                                 <textarea

                                     value={this.state.textAreaValue}
                                     onChange={this.handleChange}
                                     rows={5}
                                     cols={50}
                                 />
                  <br />
                  <br />
                  <br />
                 <center>
               <button onClick={event =>  window.location.href='./buyer'} > Close</button>
                  </center>
            </div>
        );
    }
}
export default Feedback;