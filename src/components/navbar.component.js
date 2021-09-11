import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //link to different routes

export default class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark w-5"> 
                <Link to="/" className="navbar-brand">Finance Tracker</Link>   
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link to="/tuition" className="nav-link">Tuition</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/expenses" className="nav-link">Expenses</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/loans" className="nav-link">Loans</Link>
                        </li>
                    </ul>
                </div>
            </nav> 
        );
    }
}       