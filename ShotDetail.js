import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight
} from 'react-native';

class ShotDetail extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <TouchableHighlight onPress={() => this.onTestPressed()} underlayColor="red" style={styles.test}>
                <Text style={styles.text}>Test</Text>
            </TouchableHighlight>
        );
    }

    onTestPressed() {
        this.props.navigator.push({
            id: 'shots',
        });
    }
}

var styles = StyleSheet.create({
    test: {
        width: 100,
        height: 100,
        backgroundColor: '#000000',
    },
    text: {
        width: 50,
        height: 50,
        backgroundColor: '#ffffff',
    }
});


module.exports = ShotDetail;