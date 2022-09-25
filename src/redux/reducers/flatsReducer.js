import actionTypes from '../actions/actionTypes';

function flatsReducer(flats = [], action) {
  if (action.type === actionTypes.LOAD_FLATS) {
    return action.flats;
  } else {
    return flats;
  }
}

export default flatsReducer;
