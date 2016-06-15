import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableOpacity
} from 'react-native';


var ShotsView = require("./ShotsView");
var ShotDetail = require("./ShotDetail");

class AwesomeProject extends Component {
    render() {
        var NavigationBarRouteMapper = {
            LeftButton(route, navigator, index, navState) {
                return null;
            },
            RightButton(route, navigator, index, navState) {
                return null;
            },
            Title(route, navigator, index, navState) {
                return (
                    <TouchableOpacity
                        onPress={() => navigator.pop()}>
                        <Text style={styles.navText}>
                            {route.id}
                        </Text>
                    </TouchableOpacity>
                );
            }
        };

        return (
            <Navigator
                initialRoute={{id: 'shots'}}
                renderScene={this.renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar
                        style={styles.navigationContainer}
                        routeMapper={NavigationBarRouteMapper} />
                    }
            />
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'shots':
                return (
                    <ShotsView navigator={navigator} title="Shots"/>
                );
            case 'shotDetail':
                return (
                    <ShotDetail navigator={navigator} title="ShotDetail" route={route}/>
                );
        }
    }
}

var styles = StyleSheet.create({
        navigationContainer: {
            backgroundColor: '#246dd5',
            alignItems: 'center'
        },
        navText: {
            color: 'white',
            fontSize: 12
        }
    })
    ;
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);