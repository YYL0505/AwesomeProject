import { combineReducers } from 'redux'
import shot from './shot'
import user from './user'

const reducers = combineReducers({
  shot,
  user
});

export default reducers