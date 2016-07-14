import React, {Component} from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import IOSBaseApp from '../components/IOSBaseApp';
import AndroidBaseApp from '../components/AndroidBaseApp';

//apply thunk
const createStoreWithThunk = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithThunk(reducer);

class App extends Component {
    render() {
        if (Platform.OS === 'ios') {
            return (
                <Provider store={store}>
                    <IOSBaseApp />
                </Provider>
            );
        } 
        
        return (
            <Provider store={store}>
                <AndroidBaseApp />
            </Provider>
        );
    }
}
export default App;