import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; //import datepicker
import "react-datepicker/dist/react-datepicker.css"; //import datepicker styling

export default class CreateLoans extends Component {
    constructor(props){
        super(props);

        //bindings
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDuedate = this.onChangeDuedate.bind(this);
        this.onChangeInterest = this.onChangeInterest.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            price: 0,
            duedate: new Date(),
            interest: ''
        }
    }

    //change values
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }
    onChangeDuedate(date) {
        this.setState({
            duedate: date
        })
    }
    onChangeInterest(e) {
        this.setState({
            interest: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault(); //prevents default behaviour

        const loan = {
            title: this.state.title,
            price: this.state.price,
            duedate: this.state.duedate,
            interest: this.state.interest
        }
        console.log(loan); 

        axios.post('http://localhost:5000/loans/add', loan) //send data to mongodb
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        window.location = "/loans" //take user back to list
    }
    

    render () {
        return (
            <div className="bg-light text-dark p-3">
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                </head>
                <h3>Add A Loan</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                        required 
                        className="form-control"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text" 
                        required 
                        className="form-control"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Date: </label>
                        <div>
                            <DatePicker 
                            selected={this.state.duedate}
                            onChange={this.onChangeDuedate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Interest: </label>
                        <input type="text" 
                        required 
                        placeholder="ex. 12% Yearly"
                        className="form-control"
                        value={this.state.interest}
                        onChange={this.onChangeInterest}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                        type="submit"
                        value="Add Loan"
                        className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}