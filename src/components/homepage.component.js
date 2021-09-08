import 'bootstrap/dist/css/bootstrap.min.css' //imports compiled css
import React, { Component } from 'react';

export default class HomePage extends Component {
    render () {
        return (
            <div>
                <h1 className="text-center">
                Welcome to the Finance Tracker! 
                </h1>
                <h5>Use this application to keep track of your: </h5>
                <ul>
                    <li>Tuition</li>
                    <li>Expenses</li>
                    <li>Loans</li>
                </ul>
            </div>
        );
    }
}