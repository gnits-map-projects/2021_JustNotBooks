import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";
import "./feedback.css"
import Nav from "./Nav.js"
import item from "./Seller.js"
import swal from 'sweetalert'

class Feedback extends React.Component {

    constructor() {
        super();
        this.state = {
            review: '',
            itemname: window.sessionStorage.getItem("feedbackname"),
            //itemname:'',
            //id:sessionStorage.getItem("id"),
            rate1: '',
            rate2: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRatingItemChange = this.handleRatingItemChange.bind(this);
        this.handleRatingSellerChange = this.handleRatingSellerChange.bind(this);

    }


    handleChange(event) {
        this.setState({ review: event.target.value });
    }
    handleRatingItemChange(event) {
        console.log(event);
        //here set your state for rating
        this.setState({ rate1: event });
        sessionStorage.setItem("rating", this.state.rate1);
    }

    handleRatingSellerChange(event) {
        console.log(event);
        //here set your state for rating
        this.setState({ rate2: event });
    }
    handleSubmit(event) {

        event.preventDefault();
        console.log(this.state)
        console.log(this.state.id);
        var body = {
            review: this.state.review,
            rate1: this.state.rate1,
            rate2: this.state.rate2,
            //id:this.state.id,
            itemname: this.state.itemname,
            //itemname:sessionStorage.getItem("itemName"),
        }
        console.log(body);

        const url = "http://localhost:9000/addrating";
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('POST', 'GET');

        fetch(url, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(body)
        })

            .then(response => {
                if (response.ok) {

                    //alert('Details submitted successfully!!');
                    //swal({title:"Error",text:"Details submitted successfully!!",type:"success",timer:5000});
                    swal("Good Job!", "Submitted successfully!!", "success")
                    //this.fun.bind(this);
                    this.props.history.push("/seller");
                    //window.location.href="/main";

                }
                else {


                    //this.fun.bind(this);
                    //alert('Username already exists!!Please try to login');
                    //swal({title:"Error",text:"Username already exists!!Please try to login",type:"error",timer:5000});
                    swal("Error!", "Please try again", "error")
                    this.props.history.push("/feedback");

                }
            })
            .catch(() => console.log("can't access " + url + " response. "))
    }


    render() {

        return (
            <div className="feedback" >
                <h2> <center>Feedback</center></h2>
                <textarea
                    name="review"
                    value={this.state.textAreaValue}
                    onChange={this.handleChange}
                    placeholder="Please provide your Feedback..."
                    rows={6}
                    cols={50}
                />
                <br></br>
                <h5><b>Rate the Item</b></h5>
                <ReactStars
                    count={5}
                    size={60}
                    activeColor="#ffd700"
                    name="rate1"
                    onChange={this.handleRatingItemChange}
                    value={this.state.rate1}
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
                    name="rate2"
                    onChange={this.handleRatingSellerChange}
                    value={this.state.rate2}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}

                />
                <br /><center>
                    <button type="submit" onClick={this.handleSubmit}> Submit </button>

                </center>
            </div>
        );
    }
}
export default Feedback;