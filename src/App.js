import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css" //imports compiled css
import { BrowserRouter as Router, Route } from "react-router-dom" //for routing

//import components
import Navbar from "./components/navbar.component";
import HomePage from "./components/homepage.component";

import TuitionList from "./components/tuition-list.component";
import CreateTuition from "./components/create-tuition.component";
import EditTuition from "./components/edit-tuition.component";

import ExpensesList from "./components/expenses-list.component";
import CreateExpense from "./components/create-expense.component";
import EditExpense from "./components/edit-expense.component";

import LoansList from "./components/loans-list.component";
import CreateLoan from "./components/create-loan.component";
import EditLoan from "./components/edit-loan.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={HomePage} />
        
        <Route path="/tuition" exact component={TuitionList} />
        <Route path="/tuition/create" exact component={CreateTuition} />
        <Route path="/tuition/edit/:id" exact component={EditTuition} />

        <Route path="/expenses" exact component={ExpensesList} />
        <Route path="/expenses/create" exact component={CreateExpense} />
        <Route path="/expenses/edit/:id" exact component={EditExpense} />

        <Route path="/loans" exact component={LoansList} />
        <Route path="/loans/create" exact component={CreateLoan} />
        <Route path="/loans/edit/:id" exact component={EditLoan} />
      </div>
    </Router>
  );
}

export default App;
