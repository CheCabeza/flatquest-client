import actionTypes from '../actions/actionTypes';

function userReducer(user = {}, action) {
  if (action.type === actionTypes.ADD_FAVORITE) {
    return {...user, ...action.user};
  } else {
    return user;
  }
}

export default userReducer;
