import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import "./feedback.css"
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
            <div className="feedback" >
                 <h2> <center>Feedback</center></h2>
                                 <textarea

                                     value={this.state.textAreaValue}
                                     onChange={this.handleChange}
                                     placeholder="Please provide your Feedback..."
                                     rows={6}
                                     cols={60}
                                 />
                  <br></br>
                 <h5><b>Rate the Item</b></h5>
                <ReactStars
                    count={5}
                    size={60}
                    activeColor="#ffd700"
                    isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}

                />
                <h5><b>Rate Your Seller</b></h5>
                                <ReactStars
                                    count={5}
                                    size={60}
                                    activeColor="#ffd700"
                                    isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}

                                />
                <br /><center>
               <button onClick={event =>  window.location.href='./seller'} > Submit </button>
                  </center>
            </div>
        );
    }
}
export default Feedback;