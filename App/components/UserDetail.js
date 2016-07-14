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

import ShotDetail from './ShotDetail';
var HTMLView = require('react-native-htmlview');
import ShotCell from './ShotCell'

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            user: null,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderShotItem.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                contentContainerStyle={styles.listView}
                enableEmptySections={true}
            />
        );
    }
  
    renderShotItem(shot) {
      return (<ShotCell shot={shot} navigator={this.props.navigator}/>);
    }

    renderHeader() {
        var userShots = '<p><span>' + this.state.user.shots_count + '</span> Shots</p>';
        var userFollowers = '<p><span>' + this.state.user.followings_count + '</span> Followers</p>';
        var userFollowers = '<p><span>' + this.state.user.followings_count + '</span> Followers</p>';
        return (
            <View>

                <View style={styles.userInfo}>

                    <View style={styles.userInfoBar}>
                        <HTMLView
                            value={userShots}
                            stylesheet={userInfoHtmlViewStyle}
                        />
                        <HTMLView
                            value={userFollowers}
                            stylesheet={userInfoHtmlViewStyle}
                        />
                    </View>

                    <View style={styles.userBasicInfo}>

                        <Image style={styles.userAvatar} source={{uri: this.state.user.avatar_url}}/>

                        <Text style={styles.userName}>
                            {this.state.user.name}
                        </Text>

                        <Text style={styles.userLocation}>
                            {this.state.user.location}
                        </Text>

                        <HTMLView
                            value={this.state.user.bio}
                            stylesheet={userEmail}
                        />

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
                    <Spinner visible={!this.state.loaded}/>
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
                this.setState({
                    user: responseData,
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
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    loaded: true,
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

    container: {
        marginTop: Platform.OS === 'ios' ? 65 : 60,
    },

    spinnerContainer: {
        transform: [{'translate': [0, 0, 1]}],
    },

    listView: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F4F4F4',
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

    shotContainer: {
        backgroundColor: '#ffffff',
        padding: 5,
        margin: 10,
    },

    thumbnail: {
        resizeMode: 'cover',
        width: 140,
        height: 95,
    },

    shotActionBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },

    shotActionBarImage: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        marginRight: 2,
    },

    shotActionBarViewCount: {
        fontSize: 8,
        textAlign: 'center',
        marginRight: 5,
    },

    shotActionBarLikeCount: {
        fontSize: 8,
        textAlign: 'center',
        marginRight: 5,
    },

    shotActionBarCommentCount: {
        fontSize: 8,
        textAlign: 'center',
    },
});

export default UserDetail;