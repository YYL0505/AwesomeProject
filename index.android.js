/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
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
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                contentContainerStyle={styles.listView}
            />
        );
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
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

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={styles.thumbnail}
                />

                <View style={styles.shotActionBar}>
                    <Image
                        source={require('./asserts/ic_visibility.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarViewCount}>
                        10
                    </Text>

                    <Image
                        source={require('./asserts/ic_favorite.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarLikeCount}>
                        8
                    </Text>

                    <Image
                        source={require('./asserts/ic_message.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarCommentCount}>
                        5
                    </Text>
                </View>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flexWrap:'wrap',
        flexDirection:'row',
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
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent: 'flex-end',
        width: 120,
        marginTop: 10,
    },
    shotActionBarImage: {
        width: 12,
        height: 12,
        justifyContent: 'center',
        resizeMode: 'contain',
        marginRight:2,
    },
    shotActionBarViewCount: {
        fontSize: 8,
        textAlign: 'center',
        marginRight:5,
    },
    shotActionBarLikeCount: {
        fontSize: 8,
        textAlign: 'center',
        marginRight:5,
    },
    shotActionBarCommentCount: {
        fontSize: 8,
        textAlign: 'center',
    },

    listView: {
        backgroundColor: '#F4F4F4',
        paddingLeft: 20,
        paddingRight: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);