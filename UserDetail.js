import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
} from 'react-native';

var HTMLView = require('react-native-htmlview');


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
                renderSectionHeader={this.renderHeader.bind(this)}/>
        );
    }

    renderShotItem() {
        return (
            <Text>
                shot
            </Text>
        );
    }

    renderHeader() {
        var userShots = '<p><span>' + this.state.user.shots_count + '</span> Shots</p>';
        var userFollowers = '<p><span>' + this.state.user.followings_count + '</span> Followers</p>';
        return (
            <View>
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

                <View style={styles.userInfo}>
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
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
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
        fetch('https://api.dribbble.com/v1/shots/' + this.props.route.userId + '/shots', {
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
            color: '#767676'
        },
    }
);


var styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 10,
    },

    userInfoBar: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    userInfo: {
        alignItems: 'center',
    },

    userAvatar: {
        height: 50,
        width: 50,
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'contain',
        borderRadius: 20,
    },

    commentSeparator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },

    userName: {
        fontWeight: 'bold',
        color: '#464646',
    },

    userLocation: {
        flex: 1,
        fontSize: 12,
        color: '#989898',
    },

});

module.exports = UserDetail;