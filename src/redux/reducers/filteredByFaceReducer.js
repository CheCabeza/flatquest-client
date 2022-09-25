import actionTypes from '../actions/actionTypes';

function filteredByFaceReducer(filteredFlats = [], action) {
  if (action.type === actionTypes.FILTER_FLATS_FACE) {
    return action.filteredFlats;
  } else {
    return filteredFlats;
  }
}

export default filteredByFaceReducer;
