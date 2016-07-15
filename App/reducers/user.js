import React from 'react';
import { ListView } from 'react-native';

var dataSource = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, });
var initState = {
  userInfo: {},
  shots: dataSource.cloneWithRows([])
};  
  
const user = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_USER_INFO':
            return Object.assign({}, state, {
                userInfo: action.userInfo,
            });
        case 'FETCH_SHOTS':
            return Object.assign({}, state, {
                shots: dataSource.cloneWithRows(action.shots)
            });
        default:
            return state;
    }
};

export default user;