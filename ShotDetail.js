import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight
} from 'react-native';

class ShotDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Image style={styles.userAvatar} source={require('./asserts/ic_favorite.png')} />

                    <View>
                        <Text style={styles.shotTitle}>
                            Title
                        </Text>

                        <Text style={styles.userName}>
                            By user
                        </Text>
                    </View>
                </View>

                <View style={styles.shotContainer}>
                    <Image style={styles.shotImage} source={require('./asserts/ic_favorite.png')} />
                </View>

                <View style={styles.actionContainer}>
                    <Image source={require('./asserts/ic_visibility.png')} style={styles.shotActionBarImage} />
                    <Text style={styles.shotActionBarViewCount}>
                        12
                    </Text>

                    <Image source={require('./asserts/ic_favorite.png')} style={styles.shotActionBarImage}/>
                    <Text style={styles.shotActionBarLikeCount}>
                        12
                    </Text>

                    <Image source={require('./asserts/ic_message.png')}  style={styles.shotActionBarImage} />
                    <Text style={styles.shotActionBarCommentCount}>
                        12
                    </Text>
                </View>
            </View>
        );
    }

    onTestPressed() {
        this.props.navigator.push({
            id: 'shots',
        });
    }
}

var styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    userContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },

    userAvatar: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        resizeMode: 'contain',
    },

    shotTitle: {
    },

    userName: {
    },

    shotContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },

    shotImage: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
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
        marginRight: 10,
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

});


module.exports = ShotDetail;