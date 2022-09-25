import actionTypes from '../actions/actionTypes';

function authReducer(user = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return action.user;

    case actionTypes.LOGOUT_USER:
      return action.user;

    case actionTypes.ADD_FAVORITE:
      return {
        ...user,
        user: {
          ...user.user,
          ...action.user,
        },
      };

    default:
      return user;
  }
}

export default authReducer;
