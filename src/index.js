import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
// import burgerBuilderReducer from './store/reducer/burgerBuilder';
import burgerReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';


//combine reducers
const rootReducer = combineReducers({
    burgerReducer: burgerReducer,
    orderReducer : orderReducer,
    authReducer : authReducer //(auth : authReducer)
});

// //REDUX DEV TOOLS WITH 'COMPOSE'
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


// //HERE WE ARE ADDING THE MIDDLEWARE REDUX DEV TOOLS and THUNK TO 'STORE'
const store =createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)))


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
