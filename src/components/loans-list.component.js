import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //to link to certain URL
import axios from 'axios';

//functional react component (since it only needs to accept props & return JSX)
const Loans = props => (
    <tr>
        <td>{props.loan.title}</td>
        <td>${props.loan.price}</td>
        <td>{props.loan.duedate.substring(0,10)}</td>
        <td>{props.loan.interest}</td>
        <td>
            <Link to={"/loans/edit/"+props.loan._id} type="button" className="btn btn-outline-primary col-lg-12">Edit</Link> 
            <button type="button" className="btn btn-outline-danger col-lg-12 mt-1" href="" onClick={() => { props.deleteLoans(props.loan._id) }}>Delete</button>
        </td>
    </tr>
)

//class component
export default class LoansList extends Component {
    constructor(props){
        super(props);

        this.deleteLoans = this.deleteLoans.bind(this)

        this.state = {
            loans: []
        };
    }

    //return all tuition
    componentDidMount(){
        axios.get('http://localhost:5000/loans/')
            .then(response => {
                this.setState({
                    loans: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //delete tuition
    deleteLoans(id) {
        axios.delete('http://localhost:5000/loans/'+id)
            .then(response => console.log(response.data)); 
        //delete from frontend
        this.setState({
            loans: this.state.loans.filter(el => el._id !== id) //if the id does not equal to deleted id (_id from mongodb)
        })
    }

    loansList(){
        return this.state.loans.map(currentloans => { //for every element in the array return component
            return <Loans loan={currentloans} deleteLoans={this.deleteLoans} key={currentloans._id}/>; //pass 3 props
        })
    }

    render() {
        return (
            <div>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                </head>
                <h3>Your Loans</h3>
                <table className ="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Duedate</th>
                            <th>Interest</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.loansList() }
                    </tbody>
                </table>
                <Link to="/loans/create" type="button" className="btn btn-secondary">Add A Loan</Link>
            </div>
        )
    }
}