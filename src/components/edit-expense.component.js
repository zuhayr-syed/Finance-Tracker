import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //to link to certain URL
import axios from 'axios';
import DatePicker from 'react-datepicker'; //import datepicker
import "react-datepicker/dist/react-datepicker.css"; //import datepicker styling

export default class EditExpense extends Component {
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

    componentDidMount(){
        axios.get('http://localhost:5000/expenses/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    price: response.data.price,
                    duedate: new Date(response.data.duedate),
                    period: response.data.period
                })
            })
            .catch(function (error){
                console.log(error);
            })
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

        axios.post('http://localhost:5000/expenses/update/'+this.props.match.params.id, expense) //send data to mongodb
            .then(res => console.log(res.data));

        window.location = "/expenses" //take user back to list
    }
    

    render () {
        return (
            <div className="bg-light text-dark p-3">
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                </head>
                <h3>Edit Expense</h3>
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
                        value="Edit Expense"
                        className="btn btn-primary mr-2" />
                        <Link to="/expenses" type="button" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}