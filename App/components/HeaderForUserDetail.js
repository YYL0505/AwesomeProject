import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
var HTMLView = require('react-native-htmlview');

class HeaderForUserDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       const userInfo = this.props.userInfo;
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

export default HeaderForUserDetail;