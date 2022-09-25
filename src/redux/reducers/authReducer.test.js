import authReducer from './authReducer';
import actionTypes from '../actions/actionTypes';

describe('Given authReducer function ', () => {
  test('when resolved with LOGIN_USER, then should return user data', () => {
    expect(
      authReducer(
        {},
        {
          type: actionTypes.LOGIN_USER,
          user: {name: 'kentia'},
        },
      ),
    ).toEqual({name: 'kentia'});
  });

  test('when resolved with LOGOUT_USER, then should return empty object', () => {
    expect(
      authReducer(
        {},
        {
          type: actionTypes.LOGOUT_USER,
          user: {},
        },
      ),
    ).toEqual({});
  });

  test('when resolved with ADD_FAVORITE, then should return user and object', () => {
    expect(
      authReducer(
        {},
        {
          type: actionTypes.ADD_FAVORITE,
          user: {name: 'kentia'},
        },
      ),
    ).toEqual({user: {name: 'kentia'}});
  });

  test('when resolved with RANDOM_VALUE, then should return default user', () => {
    expect(
      authReducer(
        {},
        {
          type: 'RANDOM_VALUE',
          user: {},
        },
      ),
    ).toEqual({});
  });

  test('when resolved with RANDOM_VALUE and undefined filteredFlats, then should return default user', () => {
    expect(
      authReducer(undefined, {
        type: 'RANDOM_VALUE',
      }),
    ).toEqual({});
  });
});
