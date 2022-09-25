import userReducer from './userReducer';
import actionTypes from '../actions/actionTypes';

describe('Given filteredBByFaceReducer function ', () => {
  test('when resolved with FILTER_FLATS_FACE, then should return filteredFlats data', () => {
    expect(
      userReducer([], {
        type: actionTypes.ADD_FAVORITE,
        user: {name: 'chema'},
      }),
    ).toEqual({name: 'chema'});
  });

  test('when resolved with RANDOM_VALUE, then should return {}', () => {
    expect(
      userReducer(
        {},
        {
          type: 'RANDOM_VALUE',
          user: {name: 'chema'},
        },
      ),
    ).toEqual({});
  });

  test('when resolved with RANDOM_VALUE and undefined user, then should return default user', () => {
    expect(
      userReducer(undefined, {
        type: 'RANDOM_VALUE',
      }),
    ).toEqual({});
  });
});
