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

var HTMLView = require('react-native-htmlview')

class ShotDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            shot: null,
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
                renderRow={this.renderCommentItem}
                renderSeparator={this.renderSeparator}
                renderSectionHeader={this.renderHeader.bind(this)}/>
        );
    }

    fetchData() {
        fetch('https://api.dribbble.com/v1/shots/' + this.props.route.shotId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 06dde48a787703eabbb9b42f68ed8b24ab5be606eb03a837637cf47145ebded2',
            }
        }).then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    shot: responseData,
                });

                this.fetchingComment();
            })
    }

    fetchingComment() {
        fetch('https://api.dribbble.com/v1/shots/' + this.props.route.shotId + '/comments', {
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

    renderHeader() {
        return (
            <View>
                <View style={styles.userContainer}>
                    <Image style={styles.userAvatar} source={{uri: this.state.shot.user.avatar_url}}/>

                    <View>
                        <Text style={styles.shotTitle}>
                            {this.state.shot.title}
                        </Text>

                        <Text style={styles.userName}>
                            {this.state.shot.user.name}
                        </Text>
                    </View>
                </View>

                <View style={styles.shotContainer}>
                    <Image style={styles.shotImage} source={{uri: this.state.shot.images.normal}}/>
                </View>

                <View style={styles.actionContainer}>
                    <Image source={require('./asserts/ic_visibility.png')} style={styles.shotActionBarImage}/>
                    <Text style={styles.shotActionBarViewCount}>
                        {this.state.shot.views_count}
                    </Text>

                    <Image source={require('./asserts/ic_favorite.png')} style={styles.shotActionBarImage}/>
                    <Text style={styles.shotActionBarLikeCount}>
                        {this.state.shot.likes_count}
                    </Text>

                    <Image source={require('./asserts/ic_message.png')} style={styles.shotActionBarImage}/>
                    <Text style={styles.shotActionBarCommentCount}>
                        {this.state.shot.comments_count}
                    </Text>
                </View>
            </View>
        );
    }

    renderCommentItem(comment) {
        return (
            <View style={styles.commentContainer}>
                <Image source={{uri: comment.user.avatar_url}} style={styles.commentUserAvatar}/>

                <View style={styles.commentRight}>
                    <Text style={styles.commentUserName}>
                        {comment.user.name}
                    </Text>

                    <HTMLView
                        value={comment.body}
                        stylesheet={htmlViewStyle}
                    />

                    <View style={styles.commentActionContainer}>
                        <Text style={styles.commentActionIssueTime}>
                            issued time | Like?
                        </Text>
                        <Text style={styles.commentActionVacant}>

                        </Text>
                        <Image
                            source={require('./asserts/ic_favorite.png')}
                            style={[styles.commentActionLikeIcon, {opacity: (comment.likes_count == '0')? 0: 1}]} />
                        <Text style={[styles.commentActionLikesCount, {opacity: (comment.likes_count == '0')? 0: 1}]}>
                            {comment.likes_count}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    renderSeparator() {
        return (
            <View style={styles.commentSeparator}/>
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
}
var htmlViewStyle = StyleSheet.create({
    p: {
        color: '#000000',
    },
});

var styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },

    userContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },

    userAvatar: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        resizeMode: 'contain',
        borderRadius: 20,
        marginRight: 3,
    },

    shotTitle: {},

    userName: {},

    shotContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#ffffff',
        padding: 8,
    },

    shotImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 200,
        flex: 1,
    },

    actionContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 50,
        marginTop: 10,
    },

    shotActionBarImage: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        resizeMode: 'contain',
        marginRight: 2,
    },
    shotActionBarViewCount: {
        fontSize: 12,
        textAlign: 'center',
        marginRight: 5,
    },
    shotActionBarLikeCount: {
        fontSize: 12,
        textAlign: 'center',
        marginRight: 5,
    },
    shotActionBarCommentCount: {
        fontSize: 12,
        textAlign: 'center',
    },

    commentContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 10,
    },

    commentSeparator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },

    commentUserAvatar: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        resizeMode: 'contain',
        borderRadius: 20,
        marginRight: 3,
    },

    commentRight: {
        flex: 1,
    },

    commentUserName: {
        fontWeight: 'bold',
    },

    commentActionContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop:5,
        alignItems: 'flex-end',
    },

    commentActionVacant: {
        flex: 1,
    },

    commentActionIssueTime: {
        color: '#989898',
        fontSize: 10,
    },

    commentActionLikeIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        marginRight: 2,
    },

    commentActionLikesCount: {
        color: '#989898',
        fontSize: 10,
    }

});

module.exports = ShotDetail;