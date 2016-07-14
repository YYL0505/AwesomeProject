import React, {Component} from 'react';
import {
    StyleSheet,
    NavigatorIOS,
} from 'react-native';

import ShotsView from './ShotsView'

class IOSBaseApp extends Component {
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
export default IOSBaseApp;