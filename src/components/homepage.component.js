import 'bootstrap/dist/css/bootstrap.min.css' //imports compiled css
import React, { Component } from 'react';

export default class HomePage extends Component {
    render () {
        return (
            <div className="mt-3 bg-secondary text-white p-5">
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                </head>
                <h1 className="text-center">
                Welcome to the Finance Tracker! 
                </h1>
                <h5 className="mt-5">Use this application to keep track of your: </h5>
                <ul>
                    <li>Tuition</li>
                    <li>Expenses</li>
                    <li>Loans</li>
                </ul>
            </div>
        );
    }
}