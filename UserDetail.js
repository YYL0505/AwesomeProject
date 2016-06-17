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
                renderSectionHeader={this.renderHeader.bind(this)}
                contentContainerStyle={styles.listView}
            />
        );
    }

    renderShotItem(shot) {
        return (
            <View style={styles.shotContainer}>
                <TouchableHighlight
                    onPress={() => this.props.navigator.push({id: 'shotDetail', title: 'Shot Detail', shotId: shot.id})}>
                    <Image
                        source={{uri: shot.images.normal}}
                        style={styles.thumbnail}
                    />

                </TouchableHighlight>

                <View style={styles.shotActionBar}>
                    <Image
                        source={require('./asserts/ic_visibility.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarViewCount}>
                        {shot.views_count}
                    </Text>

                    <Image
                        source={require('./asserts/ic_favorite.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarLikeCount}>
                        {shot.likes_count}
                    </Text>

                    <Image
                        source={require('./asserts/ic_message.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarCommentCount}>
                        {shot.comments_count}
                    </Text>
                </View>
            </View>
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
    container: {
        marginTop: 60,
        marginBottom: 20,
    },

    listView: {
        paddingLeft: 25,
        paddingRight: 10,
        backgroundColor: '#F4F4F4',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    userInfoBar: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    userInfo: {
    },

    userAvatar: {
        height: 50,
        width: 50,
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

    shotContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: 150,
        height: 120,
        marginTop: 10,
        marginRight: 10,
    },

    thumbnail: {
        resizeMode: 'cover',
        width: 140,
        height: 95,
    },

    shotActionBar: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 120,
        marginTop: 10,
    },

    shotActionBarImage: {
        width: 12,
        height: 12,
        justifyContent: 'center',
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

module.exports = UserDetail;