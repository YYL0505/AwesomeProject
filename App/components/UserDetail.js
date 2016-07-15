import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

import ShotDetail from './ShotDetail';
import ShotCell from './ShotCell'
import HeaderForUserDetail from './HeaderForUserDetail'
import api from '../utils/api';

class UserDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (this.props.state.default.loading.isLoading) {
            return this.renderLoadingView();
        }
      
        const userState = this.props.state.default.user;
        return (
            <ListView
                style={styles.list}
                dataSource={userState.shots}
                renderRow={this.renderShotItem.bind(this)}
                renderHeader={this.renderHeader.bind(this, userState.userInfo)}
                contentContainerStyle={styles.listView}
                enableEmptySections={true}
            />
        );
    }
  
    renderShotItem(shot) {
        return (<ShotCell shot={shot} navigator={this.props.navigator}/>);
    }

    renderHeader(userInfo) {
        return (<HeaderForUserDetail userInfo={userInfo}/>)
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <View style={styles.spinnerContainer}>
                    <Spinner visible={this.props.state.default.loading.isLoading}/>
                </View>
            </View>
        );
    }

    fetchData() {
        api.fetchUser(this.props.route.userId)
          .then((responseData) => {
                this.props.dispatch({
                  type: 'FETCH_USER_INFO',
                  userInfo: responseData
                });
                this.fetchingShot();
            })
    }


    fetchingShot() {
         api.fetchShotsForUser(this.props.route.userId)
           .then((responseData) => {
                this.props.dispatch({
                        type: 'FETCH_SHOTS',
                        shots: responseData
                      });
                this.props.dispatch({
                        type: 'TOGGLE_LOADING_OFF'
                      });
            }).done();
    }

}

var styles = StyleSheet.create({
    list: {
        marginTop: Platform.OS === 'ios' ? 65 : 60,
    },

    spinnerContainer: {
        transform: [{'translate': [0, 0, 1]}],
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

function selector(state) {
    return {
        state: state
    }
}
export default connect(selector)(UserDetail);