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

var GiftedListView = require('react-native-gifted-listview');
var GiftedSpinner = require('react-native-gifted-spinner');

class ShotsView extends Component {
    constructor(props) {
        super(props);
    }

    _onFetch(page = 1, callback, options) {
        setTimeout(() => {
            fetch('https://api.dribbble.com/v1/shots?page=' + page + '&per_page=20', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 06dde48a787703eabbb9b42f68ed8b24ab5be606eb03a837637cf47145ebded2',
                }
            }).then((response) => response.json())
                .then((responseData) => {
                    callback(responseData);
                });
        }, 1000);

    }

    _renderRowView(rowData) {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.props.navigator.push({id: 'shotDetail', title: 'Shot Detail', shotId: rowData.id})}>
                    <Image
                        source={{uri: rowData.images.normal}}
                        style={styles.thumbnail}
                    />

                </TouchableHighlight>

                <View style={styles.shotActionBar}>
                    <Image
                        source={require('./asserts/ic_visibility.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarViewCount}>
                        {rowData.views_count}
                    </Text>

                    <Image
                        source={require('./asserts/ic_favorite.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarLikeCount}>
                        {rowData.likes_count}
                    </Text>

                    <Image
                        source={require('./asserts/ic_message.png')}
                        style={styles.shotActionBarImage}
                    />
                    <Text style={styles.shotActionBarCommentCount}>
                        {rowData.comments_count}
                    </Text>
                </View>
            </View>
        );
    }

    _renderPaginationWaitingView(paginateCallback) {
        return (
            <TouchableHighlight
                onPress={paginateCallback}
                style={styles.paginationView}>
                <Text style={styles.loadMoreActionsLabel}>
                    Load more
                </Text>
            </TouchableHighlight>
        );
    }

    _renderPaginationFetchingView() {
        return (
            <View style={styles.paginationView}>
                <GiftedSpinner style={styles.loadingActionsLabel}/>
            </View>
        );
    }

    render() {
        return (
            <GiftedListView
                style={styles.list}
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch}
                firstLoader={true} // display a loader for the first fetching

                pagination={true} // enable infinite scrolling using touch to load more
                paginationWaitingView={this._renderPaginationWaitingView}
                paginationFetchingView={this._renderPaginationFetchingView}

                refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                withSections={false} // enable sections
                enableEmptySection={true}
                refreshableTintColor="blue"
                contentContainerStyle={styles.listView}
            />
        );
    }
}

var styles = StyleSheet.create({
    list: {
        marginTop: 50,
    },
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
    listView: {
        backgroundColor: '#F4F4F4',
        paddingLeft: 20,
        paddingRight: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    loadMoreActionsLabel: {
        fontSize: 12,
        color: '#007aff',
    },
    loadingActionsLabel: {
        height: 20,
    },
    paginationView: {
        height: 30,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = ShotsView;