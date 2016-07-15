import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Platform,
    ActivityIndicatorIOS
} from 'react-native';

import ShotDetail from './ShotDetail'
import ShotCell from './ShotCell'

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
                    console.log('data got');

                    callback(responseData);
                });
        }, 1000);
    }

    _renderRowView(rowData) {
        return (<ShotCell shot={rowData} navigator={this.props.navigator}/>);
    }

    _renderPaginationWaitingView(paginateCallback) {
        return (
            <TouchableHighlight
                onPress={paginateCallback}
                style={styles.paginationView}>
                <Text style={styles.loadMoreActionsLabel}> Load more  </Text>
            </TouchableHighlight>
        );
    }

    _renderPaginationFetchingView() {
        if (Platform.OS === 'android') {
            return (
                <View style={styles.paginationView}>
                    <GiftedSpinner style={styles.loadingActionsLabel}/>
                </View>
            );
        } else {
            return (
                <ActivityIndicatorIOS animating={true} size="large"/>
            );
        }
    }

    _renderRefreshableWaitingView(refreshCallback) {
        if (Platform.OS !== 'android') {
            return (
                <View style={styles.refreshableView}>
                    <Text style={styles.actionsLabel}>  ↓ </Text>
                </View>
            );
        } else {
            return (
                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                    style={styles.refreshableView}
                >
                    <Text style={styles.actionsLabel}>  ↻ </Text>
                </TouchableHighlight>
            );
        }
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
                enableEmptySections={true}
                refreshableTintColor="blue"
                contentContainerStyle={styles.listView}

                refreshableWaitingView={this._renderRefreshableWaitingView}
            />
        );
    }
}

var styles = StyleSheet.create({
    list: {
        marginTop: Platform.OS === 'ios' ? 65 : 50,
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

    refreshableView: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsLabel: {
        fontSize: 20,
        color: '#007aff',
    },
});

export default ShotsView;