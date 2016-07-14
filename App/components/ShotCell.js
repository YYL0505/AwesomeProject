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

import ShotDetail from './ShotDetail'

class ShotCell extends Component {
    constructor(props) {
        super(props);
    }

    goToShotDetailPage() {
        this.props.navigator.push({
            id: 'shotDetail',
            title: 'Shot Detail',
            shotId: this.props.shot.id,
            component: ShotDetail,
        });
    }
  
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.goToShotDetailPage.bind(this)}>
                    <Image
                        source={{uri: this.props.shot.images.normal}}
                        style={styles.thumbnail}
                    />

                </TouchableHighlight>

                <View style={styles.shotActionBar}>
                    <Image
                        source={require('../asserts/ic_visibility.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarViewCount}>
                        {this.props.shot.views_count}
                    </Text>

                    <Image
                        source={require('../asserts/ic_favorite.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarLikeCount}>
                        {this.props.shot.likes_count}
                    </Text>

                    <Image
                        source={require('../asserts/ic_message.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarCommentCount}>
                        {this.props.shot.comments_count}
                    </Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
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

export default ShotCell;