import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; //import datepicker
import "react-datepicker/dist/react-datepicker.css"; //import datepicker styling

export default class CreateExpense extends Component {
    constructor(props){
        super(props);

        //bindings
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDuedate = this.onChangeDuedate.bind(this);
        this.onChangePeriod = this.onChangePeriod.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            price: 0,
            duedate: new Date(),
            period: ''
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
    onChangePeriod(e) {
        this.setState({
            period: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault(); //prevents default behaviour

        const expense = {
            title: this.state.title,
            price: this.state.price,
            duedate: this.state.duedate,
            period: this.state.period
        }
        console.log(expense); 

        axios.post('http://localhost:5000/expenses/add', expense) //send data to mongodb
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        window.location = "/expenses" //take user back to list
    }
    

    render () {
        return (
            <div>
                <h3>Add An Expense</h3>
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
                        <label>Time Period: </label>
                        <input type="text" 
                        required 
                        placeholder="ex. Daily, Monthly, Yearly"
                        className="form-control"
                        value={this.state.period}
                        onChange={this.onChangePeriod}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                        type="submit"
                        value="Add Expense"
                        className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}