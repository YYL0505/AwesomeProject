import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    WebView
} from 'react-native';


class UserDetail extends Component {
    render() {
        return (
            <Text style={styles.container}>
                User detail {this.props.route.userId}
            </Text>
        );
    }
    
}


var styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }
    
});

module.exports = UserDetail;