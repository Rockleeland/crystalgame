import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileFetch} from './components/actions';
import {newFriend} from './components/actions';
// import { sendNameToServer } from './socket.io/index';
import Splash from './components/pages/Splash';
import Profile from './components/pages/Profile';
import Game from './components/pages/Game';
import Instructions from './components/pages/Instructions';
import Score from './components/pages/Score';
import Layout from './components/Layout';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import './App.css';
// import io from 'socket.io-client';

class App extends Component {
  
  componentDidMount() { 
    if ((localStorage.token !== 'undefined' && localStorage.token) || localStorage.id_token) { 
      this.props.getProfileFetch()
    }

    
  }
  
  render() {
    let allUsers = this.props
 
    const App = () => (
      <div>
        <Layout />
          <div className='centered'>
            <div className='mainContainer'>
              <div className="outer">
                <div className="inner">
                  <i className="top left"></i>
                  <i className="top right"></i>
                  <div className="content">
                    <div className='connected'>{allUsers.length ? (allUsers.map(x => { return <h2>{x}</h2>})) : (null) }</div>
                    <Switch>
                        <Route exact path='/' component={Splash} />
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signup' component={Signup}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/profile/:id' component={Profile}/>
                        <Route path='/game' component={Game} data={this.props}/>
                        <Route path='/score' component={Score}/>
                        <Route path='/instructions' component={Instructions}/>
                    </Switch>
                  </div>
                  <i className="bottom right"></i>
                  <i className="bottom left"></i>
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

const mapDispatchToProps = dispatch => {
  return {
  getProfileFetch: () => dispatch(getProfileFetch()),
  newFriend: () => dispatch(newFriend()),
 
}}

const mapStateToProps = state => ({
  name: state.name,
  names: state.names,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
