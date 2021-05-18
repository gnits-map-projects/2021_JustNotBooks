import React from 'react';
import "./Review.css"

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
                <center><h2> Reviews</h2>
                    <textarea

                        value={this.state.textAreaValue}
                        onChange={this.handleChange}
                        rows={6}
                        cols={50}
                    />
                </center>
                <br />
                <br />
                <br />
                <center>
                    <button onClick={event => window.location.href = './buyer'} > Close</button>
                </center>
            </div>
        );
    }
}
export default Feedback;