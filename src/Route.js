import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './components/home.js';
import Signin from './components/signin';
import history from './History';


class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Signin} />
                    {/* {/* <Route exact path="/signup" component={Signup} /> */}
                    <Route exact path="/home" component={Home} />
                </div>
            </Router>
        )
    }
}


export default Routers;