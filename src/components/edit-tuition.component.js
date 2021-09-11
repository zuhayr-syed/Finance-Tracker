import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //to link to certain URL
import axios from 'axios';
import DatePicker from 'react-datepicker'; //import datepicker
import "react-datepicker/dist/react-datepicker.css"; //import datepicker styling

export default class EditTuition extends Component {
    constructor(props){
        super(props);

        //bindings
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDuedate = this.onChangeDuedate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            price: 0,
            duedate: new Date()
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/tuition/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    price: response.data.price,
                    duedate: new Date(response.data.duedate)
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

    onSubmit(e) {
        e.preventDefault(); //prevents default behaviour

        const tuition = {
            title: this.state.title,
            price: this.state.price,
            duedate: this.state.duedate
        }
        console.log(tuition);

        axios.post('http://localhost:5000/tuition/update/'+this.props.match.params.id, tuition) //send data to mongodb
            .then(res => console.log(res.data));

        window.location = "/tuition" //take user back to list
    }
    

    render () {
        return (
            <div className="bg-light text-dark p-3">
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                </head>
                <h3>Edit Tuition Entry</h3>
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
                        <input 
                        type="submit"
                        value="Edit Tuition"
                        className="btn btn-primary mr-2" />
                        <Link to="/tuition" type="button" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}