import React from "react";
import "./upload.css"
import Nav from "./Nav.js"
import swal from 'sweetalert'
var image1;


export class Upload extends React.Component {

  constructor(props) {
    super(props);

    this.state={

      owner:'',
      itemName:'',
      image:'',
      price:'',
      description : '',
      category: '',
      fromDate : null,
      toDate :null,
      file:null,
      uploadedAt:'',

    }
    this.handleItemNameChange=this.handleItemNameChange.bind(this)
    this.handlePriceChange=this.handlePriceChange.bind(this)
    this.handleDescriptionChange=this.handleDescriptionChange.bind(this)
    this.handleAddressChange=this.handleAddressChange.bind(this)
	  this.handleCategoryChange=this.handleCategoryChange.bind(this)
    this.handleFromChange=this.handleFromChange.bind(this)
    this.handleToChange=this.handleToChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleImage=this.handleImage.bind(this)
    //this.DateEnabale=this.DateEnabale.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
    this.state.owner = sessionStorage.getItem("name");
    this.state.uploadedAt=Date();

  }

  DateEnable(event){
    if (document.getElementById("borrow").checked) {
      document.getElementById("fromDate").style.visibility = 'visible';
      document.getElementById("toDate").style.visibility = 'visible';
  }
  else {
    document.getElementById('fromDate').style.visibility = 'hidden';
    document.getElementById('toDate').style.visibility = 'hidden';
  }

  }
  handleItemNameChange=event=>{
    this.setState({
      itemName : event.target.value
    });

  }
  handleImage(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
    image1=event.target.files[0].name;
    //console.log(image1);

  }
  handlePriceChange=event=>{
    this.setState({
      price : event.target.value
    });

  }
  handleDescriptionChange=event=>{
    this.setState({
      description : event.target.value
    });

  }
  handleAddressChange=event=>{
    this.setState({
      address : event.target.value
    });

  }

  handleCategoryChange=event=>{
    this.setState({
      category : event.target.value
    });

  }
  handleFromChange=event=>{
    this.setState({
      fromDate : event.target.value
    });

  }
  handleToChange=event=>{
    this.setState({
      toDate : event.target.value
    });

  }
  handleCancel(){
    //window.location.href="/home";
    window.history.back();
  }

  handleSubmit(event) {

    event.preventDefault();
    console.log(this.state)
     var body = {
        owner:this.state.owner,
        itemName:this.state.itemName,
        price:this.state.price,
        image:image1,
        description : this.state.description,
        address:this.state.address,
        category: this.state.category,
        fromDate: this.state.fromDate,
        toDate : this.state.toDate,
        uploadedAt:this.state.uploadedAt,
    }

    console.log(body);
        if(this.state.itemName==""){
          alert('Please enter the name of the item')
        }
    else if(this.state.price==""){
        alert('Please enter the price')
    }
    else if(this.state.description==""){
    alert('Please enter the description')
    }

    else{


  const url = "http://localhost:9000/item";
    let headers = new Headers();

    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');

    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');

    headers.append('POST','GET');

    fetch(url, {
       headers:headers,
       method: 'POST',
       body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(contents => {console.log(contents);
    sessionStorage.setItem("itemName",this.state.itemName);
    sessionStorage.setItem("price",this.state.price);
    sessionStorage.setItem("description",this.state.description);
    sessionStorage.setItem("address",this.state.address);
    sessionStorage.setItem("category",this.state.category);
    sessionStorage.setItem("fromDate",this.state.fromDate);
    sessionStorage.setItem("toDate",this.state.toDate);


 })
 .catch(()=> console.log("can't access " + url + " response. "))


 //alert('Item uploaded');
 swal("Good job!",'Item uploaded',"success");
 this.props.history.push("./profile");

  }
}



  render() {

    let today = new Date().toISOString().substr(0, 10);
    return (
      <div><Nav/>
		<div className="upload" >

				<form>
					<h5><div align = "center">
					<h2>Upload</h2></div>
						Item Name  :
						<input
                            type="text"
							placeholder="Item Name"
							name="itemName"
							value={this.state.itemName}
							onChange={this.handleItemNameChange} required
						/><br></br><br></br>
                        Price:
                        <input
                            type="text"
                            placeholder="Price"
                            name="price"
                            value={this.state.price}
                            onChange={this.handlePriceChange} required

                        />
                        <br></br><br></br><br></br>
                        Description:<input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange} required
                        />
                        <br></br>
                        <br></br>
                        Address:&nbsp;&nbsp;&nbsp;
                        <textarea
                            rows="inline"
                            columns="inline"
                            type="text"
                            name="address"
                            placeholder="Enter Address"
                            value={this.state.address}
                            onChange={this.handleAddressChange} required
                        />
                        <br></br>
                        <br></br>

                    <div className="category">
                        <label>
                            <input type="radio" id="buy" name="category" value="buy" onClick= {this.DateEnable.bind(this)} onChange={this.handleCategoryChange}/> Buy&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input type="radio" id="borrow" name="category" value="borrow" onClick= {this.DateEnable.bind(this)} onChange={this.handleCategoryChange}/>&nbsp;&nbsp;&nbsp;Borrow&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input type="radio" id="donate" name="category" value="donate" onClick= {this.DateEnable.bind(this)} onChange={this.handleCategoryChange}/>&nbsp;&nbsp;&nbsp;Donate
                        </label>
                    </div>
                    <br></br>
                    From&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;<input
                            type="date"
                            placeholder="From Date"
                            name="fromDate"
                            id="fromDate"
                            min={today}
                            value={this.state.fromDate}
                            visibility="hidden"
                            onChange={this.handleFromChange} required

                        />
                      To&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;<input
                            type="date"
                            placeholder="To Date"
                            name="toDate"
                            id="toDate"
                            min={this.state.fromDate}
                            value={this.state.toDate}
                            visibility="hidden"
                            onChange={this.handleToChange} required

                        />
                        <br></br><br></br><br></br>
                    <div class="fileimages">
                        <input type="file" onInput={this.handleImage} required/>
                            <div class="imgfile">
                            <img class="upload1" src={this.state.file2}/>
                             </div>
                           </div><br/><br/><br/>
                    <br></br><br></br><br></br><br></br>



					<div align="center" ><input type="submit" value="Submit" onClick={this.handleSubmit}/></div></h5>
          <input type="submit" value="Cancel" onClick={this.handleCancel}/>
				</form>

			</div>
      </div>
    );
  }
}


export default Upload;