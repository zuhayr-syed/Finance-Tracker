import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //to link to certain URL
import axios from 'axios';

//functional react component (since it only needs to accept props & return JSX)
const Tuition = props => (
    <tr>
        <td>{props.tuit.title}</td>
        <td>${props.tuit.price}</td>
        <td>{props.tuit.duedate.substring(0,10)}</td>
        <td>
            <Link to={"/tuition/edit/"+props.tuit._id} type="button" className="btn btn-outline-primary col-lg-12">Edit</Link> 
            <button type="button" className="btn btn-outline-danger col-lg-12 mt-1" href="" onClick={() => { props.deleteTuition(props.tuit._id) }}>Delete</button>
        </td>
    </tr>
)

//class component
export default class TuitionList extends Component {
    constructor(props){
        super(props);

        this.deleteTuition = this.deleteTuition.bind(this)

        this.state = {
            tuition: []
        };
    }

    //return all tuition
    componentDidMount(){
        axios.get('http://localhost:5000/tuition/')
            .then(response => {
                this.setState({
                    tuition: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //delete tuition
    deleteTuition(id) {
        axios.delete('http://localhost:5000/tuition/'+id)
            .then(response => console.log(response.data)); 
        //delete from frontend
        this.setState({
            tuition: this.state.tuition.filter(el => el._id !== id) //if the id does not equal to deleted id (_id from mongodb)
        })
    }

    tuitionList(){
        return this.state.tuition.map(currenttuition => { //for every element in the array return component
            return <Tuition tuit={currenttuition} deleteTuition={this.deleteTuition} key={currenttuition._id}/>; //pass 3 props
        })
    }

    render() {
        return (
            <div className="pb-5">
                <div className="bg-light text-dark p-3">
                    <head>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                    </head>
                    <h3>Your Tuition</h3>
                    <table className ="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Duedate</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.tuitionList() }
                        </tbody>
                    </table>
                    <Link to="/tuition/create" type="button" className="btn btn-secondary">Add A Tuition Entry</Link>
                </div>
            </div>
        )
    }
}