import { combineReducers } from 'redux'
import shot from './shot'
import user from './user'
import loading from './loading'

const reducers = combineReducers({
  shot,
  user,
  loading
});

export default reducers