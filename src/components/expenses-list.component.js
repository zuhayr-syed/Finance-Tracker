import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //to link to certain URL
import axios from 'axios';

//functional react component (since it only needs to accept props & return JSX)
const Expenses = props => (
    <tr>
        <td>{props.exp.title}</td>
        <td>${props.exp.price}</td>
        <td>{props.exp.duedate.substring(0,10)}</td>
        <td>{props.exp.period}</td>
        <td>
            <Link to={"/expenses/edit/"+props.exp._id} type="button" className="btn btn-outline-primary col-lg-12">Edit</Link> 
            <button type="button" className="btn btn-outline-danger col-lg-12 mt-1" href="" onClick={() => { props.deleteExpenses(props.exp._id) }}>Delete</button>
        </td>
    </tr>
)

//class component
export default class ExpensesList extends Component {
    constructor(props){
        super(props);

        this.deleteExpenses = this.deleteExpenses.bind(this)

        this.state = {
            expenses: []
        };
    }

    //return all tuition
    componentDidMount(){
        axios.get('http://localhost:5000/expenses/')
            .then(response => {
                this.setState({
                    expenses: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //delete tuition
    deleteExpenses(id) {
        axios.delete('http://localhost:5000/expenses/'+id)
            .then(response => console.log(response.data)); 
        //delete from frontend
        this.setState({
            expenses: this.state.expenses.filter(el => el._id !== id) //if the id does not equal to deleted id (_id from mongodb)
        })
    }

    expensesList(){
        return this.state.expenses.map(currentexpenses => { //for every element in the array return component
            return <Expenses exp={currentexpenses} deleteExpenses={this.deleteExpenses} key={currentexpenses._id}/>; //pass 3 props
        })
    }

    render() {
        return (
            <div>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                </head>
                <h3>Your Expenses</h3>
                <table className ="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Duedate</th>
                            <th>Period</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.expensesList() }
                    </tbody>
                </table>
                <Link to="/expenses/create" type="button" className="btn btn-secondary">Add An Expense</Link>
            </div>
        )
    }
}