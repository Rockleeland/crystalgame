import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileFetch} from './components/actions';
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

// import withAuth from './components/withAuth'



class App extends Component {

componentDidMount() { 
    console.log(localStorage)
    if ((localStorage.token !== 'undefined' && localStorage.token) || localStorage.id_token) { 
    this.props.getProfileFetch()
    }
    // const { dispatch } = this.props;
    // const name = this.props
    
    // put this socket's username inside the server
    // dispatch({ type: 'ASSIGNED_USERNAME', name });
    // sendNameToServer(name);
  }
  render() {
    console.log(this.props)
   
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

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

const mapStateToProps = state => ({
  name: state.name,
  names: state.names,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
