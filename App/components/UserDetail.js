import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

import ShotDetail from './ShotDetail';
var HTMLView = require('react-native-htmlview');
import ShotCell from './ShotCell'

class UserDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.props.state.default.loading.isLoading) {
            return this.renderLoadingView();
        }
      
        const userState = this.props.state.default.user;
        return (
            <ListView
              
                style={styles.list}
                dataSource={userState.shots}
                renderRow={this.renderShotItem.bind(this)}
                renderHeader={this.renderHeader.bind(this, userState.userInfo)}
                contentContainerStyle={styles.listView}
                enableEmptySections={true}
            />
        );
    }
  
    renderShotItem(shot) {
      return (<ShotCell shot={shot} navigator={this.props.navigator}/>);
    }

    renderHeader(userInfo) {
        var userShots = '<p><span>' + userInfo.shots_count + '</span> Shots</p>';
        var userFollowers = '<p><span>' + userInfo.followings_count + '</span> Followers</p>';
        var userFollowers = '<p><span>' + userInfo.followings_count + '</span> Followers</p>';
        return (
            <View>
                <View style={styles.userInfo}>
                    <View style={styles.userInfoBar}>
                        <HTMLView value={userShots} stylesheet={userInfoHtmlViewStyle} />
                        
                        <HTMLView  value={userFollowers} stylesheet={userInfoHtmlViewStyle} />
                    </View>

                    <View style={styles.userBasicInfo}>
                        <Image style={styles.userAvatar} source={{uri: userInfo.avatar_url}}/>

                        <Text style={styles.userName}> {userInfo.name}  </Text>

                        <Text style={styles.userLocation}> {userInfo.location} </Text>

                        <HTMLView  value={userInfo.bio} stylesheet={userEmail} />
                    </View>
                  
                    <View style={styles.commentSeparator}/>
                </View>
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <View style={styles.spinnerContainer}>
                    <Spinner visible={this.props.state.default.loading.isLoading}/>
                </View>
            </View>
        );
    }

    fetchData() {
        fetch('https://api.dribbble.com/v1/users/' + this.props.route.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 06dde48a787703eabbb9b42f68ed8b24ab5be606eb03a837637cf47145ebded2',
            }
        }).then((response) => response.json())
            .then((responseData) => {
                this.props.dispatch({
                  type: 'FETCH_USER_INFO',
                  userInfo: responseData
                });
                this.fetchingShot();
            })
    }


    fetchingShot() {
        fetch('https://api.dribbble.com/v1/users/' + this.props.route.userId + '/shots', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 06dde48a787703eabbb9b42f68ed8b24ab5be606eb03a837637cf47145ebded2',
            }
        }).then((response) => response.json())
            .then((responseData) => {
                this.props.dispatch({
                        type: 'FETCH_SHOTS',
                        shots: responseData
                      });
                this.props.dispatch({
                        type: 'TOGGLE_LOADING_OFF'
                      });
            }).done();
    }

}

var userInfoHtmlViewStyle = StyleSheet.create({
    p: {
        fontSize: 10,
    },
    span: {
        fontSize: 10,
        color: '#000000',
    },
});

var userEmail = StyleSheet.create({
        p: {
            color: '#767676',
        },
    }
);


var styles = StyleSheet.create({

    userBasicInfo: {
        alignItems: 'center',
        width: 320,
    },

    list: {
        marginTop: Platform.OS === 'ios' ? 65 : 60,
    },

    spinnerContainer: {
        transform: [{'translate': [0, 0, 1]}],
    },

    listView: {
        backgroundColor: '#F4F4F4',
        paddingLeft: 20,
        paddingRight: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    userInfoBar: {
        flexDirection: 'row',
    },

    userInfo: {
        padding: 10,
    },

    userAvatar: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        borderRadius: 20,
        alignSelf: 'center'
    },

    commentSeparator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginTop: 5,
    },

    userName: {
        fontWeight: 'bold',
        color: '#464646',
        alignSelf: 'center'
    },

    userLocation: {
        fontSize: 12,
        color: '#989898',
        alignSelf: 'center'
    },
});

function selector(state) {
    return {
        state: state
    }
}
export default connect(selector)(UserDetail);