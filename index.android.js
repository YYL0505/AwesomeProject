import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';

import App from './App/containers/App';

class AwesomeProject extends Component {
  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);