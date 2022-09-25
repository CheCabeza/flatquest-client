import {combineReducers} from 'redux';
import flatsReducer from './flatsReducer';
import filteredFlatsReducer from './filteredFlatsReducer';
import filteredByFaceReducer from './filteredByFaceReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  flats: flatsReducer,
  filteredFlats: filteredFlatsReducer,
  filteredByFace: filteredByFaceReducer,
  user: authReducer,
});

export default rootReducer;
