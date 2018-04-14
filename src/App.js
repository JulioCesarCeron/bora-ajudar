import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Sobre from './Sobre';
import Contato from './Contato';
import Campanhas from './Campanhas';

import base from './base';
import Admin from './Admin';
import Login from './Login'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contador: 1
        }
    }


    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route exact path='/' component={Home} />
                    <Route path='/sobre' component={Sobre} />
                    <Route path='/contato' component={Contato} />
                    <Route path='/campanhas' component={Campanhas} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/login' component={Login} />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;