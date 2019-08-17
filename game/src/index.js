import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './components/reducer/reducer';
import { Provider } from 'react-redux';
// import configureSocket from './socket.io/index';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './components/utils/FontLibrary';


const store = createStore(reducer, applyMiddleware(thunk));

if(localStorage.getItem("id_token")) {
	// then we will attach it to the headers of each request from react application via axios
	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
  }
//future socket connection
// export const socket = configureSocket(store.dispatch);


ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
