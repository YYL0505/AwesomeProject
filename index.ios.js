import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    View,
    NavigatorIOS,
} from 'react-native';


import ShotsView from './ShotsView'

class AwesomeProject extends Component {
  render() {

    return (
        <NavigatorIOS
            style={styles.container}
            initialRoute={{
            component: ShotsView,
            title: 'Shots',
          }}
        />
    );
  }
  
}

var styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#111111',
      },
    })
    ;
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);