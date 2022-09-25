import actionTypes from '../actions/actionTypes';

function filteredFlatsReducer(filteredFlats = [], action) {
  if (action.type === actionTypes.FILTER_FLATS) {
    return action.filteredFlats;
  } else {
    return filteredFlats;
  }
}

export default filteredFlatsReducer;
