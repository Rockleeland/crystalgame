import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Splash from './components/pages/Splash';
import Profile from './components/pages/Profile';
import Game from './components/pages/Game';
import Instructions from './components/pages/Instructions';
import Score from './components/pages/Score';
import Layout from './components/Layout';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import './App.css';


class App extends Component {
  
  render() {
   
    const App = () => (
      <div>
        <Layout />
          <div className='centered'>
            <div className='mainContainer'>
              <div class="outer">
                <div class="inner">
                  <i class="top left"></i>
                  <i class="top right"></i>
                  <div class="content">
                    <Switch>
                        <Route exact path='/' component={Splash} />
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signup' component={Signup}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/profile/:id' component={Profile}/>
                        <Route path='/game' component={Game}/>
                        <Route path='/score' component={Score}/>
                        <Route path='/instructions' component={Instructions}/>
                    </Switch>
                  </div>
                  <i class="bottom right"></i>
                  <i class="bottom left"></i>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    )
  }
}

export default (App);
