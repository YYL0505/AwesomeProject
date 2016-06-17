import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    Navigator,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';


var ShotsView = require("./ShotsView");
var ShotDetail = require("./ShotDetail");
var UserDetail = require("./UserDetail");

class AwesomeProject extends Component {
    render() {
        var NavigationBarRouteMapper = {
            LeftButton(route, navigator, index, navState) {
                if (index > 0) {
                    return (
                        <View style={styles.navigationContainer}>
                            <TouchableHighlight
                                onPress={() => navigator.pop()}>
                                <Image source={require('./asserts/ic_back.png')} style={styles.goBack}/>

                            </TouchableHighlight>
                            <Text style={styles.navText}>
                                {route.title}
                            </Text>
                        </View>

                    );
                } else{
                    return (
                        <View style={styles.navigationContainer}>
                            <Text style={styles.navText}>
                                {route.title}
                            </Text>
                        </View>
                    );
                }

            },
            RightButton(route, navigator, index, navState) {
                return null;
            },
            Title(route, navigator, index, navState) {
                return null;
            }
        };

        return (
            <Navigator
                initialRoute={{id: 'shots', title: 'Shots'}}
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
            case 'userDetail':
                return (
                    <UserDetail navigator={navigator} title="UserDetail" route={route}/>
                );
        }
    }
}

var styles = StyleSheet.create({
        navigationContainer: {
            backgroundColor: '#363636',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingLeft: 10,
        },
        goBack: {
            marginTop: 13,
            justifyContent: 'center',
            resizeMode: 'contain',
        },
        navText: {
            marginTop: 10,
            color: 'white',
            fontSize: 22
        }
    })
    ;
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);