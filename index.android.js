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
            LeftButton: (route, navigator, index, navState) => {
                if (index === 0) {
                    return null
                }
                const previousRoute = navState.routeStack[index - 1]
                return (
                    <TouchableOpacity
                        onPress={() => navigator.pop()}>
                        <Text style={styles.navText}>
                            {previousRoute.title}
                        </Text>
                    </TouchableOpacity>
                )
            },
            RightButton: (route, navigator, index, navState) => {
                if (route.rightElement) {
                    return route.rightElement
                }
            },
            Title: (route, navigator, index, navState) => {
                return (
                    <Text style={styles.navText}>{route.title}</Text>
                )
            }
        };
        return (
            <Navigator
                style={styles.navigationContainer}
                initialRoute={{id: 'shots'}}
                renderScene={this.renderScene.bind(this)}
                navigationBar={
          <Navigator.NavigationBar routeMapper={NavigationBarRouteMapper} />
        }
            />
        );
    }
    renderScene(route, navigator) {
        // _navigator = navigator;
        switch (route.id) {
            case 'shots':
                return (
                    <ShotsView navigator={navigator} title="Shots" />
                );
            case 'shotDetail':
                return (
                    <ShotDetail navigator={navigator} title="ShotDetail" />
                );
        }
    }
}

var styles = StyleSheet.create({
    navigationContainer: {
        flex: 1
    }
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);