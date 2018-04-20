import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './CHANGEME.js';


class App extends Component {
    render() { 
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Remine Frontend Developer Test</h2>
                </div>
                <p className="App-intro">
                    Congratulations!! You have gotten farther than 75% of our applicants. Don't stop here!
                </p>
                <p>
                    Do what you need to do to get this table to render filtered and fast.
                </p>
                <Test />
            </div>
        );
    }
}

export default App;
