import filteredFlatsReducer from './filteredFlatsReducer';
import actionTypes from '../actions/actionTypes';

describe('Given filteredBByFaceReducer function ', () => {
  test('when resolved with FILTER_FLATS_FACE, then should return filteredFlats data', () => {
    expect(
      filteredFlatsReducer([], {
        type: actionTypes.FILTER_FLATS,
        filteredFlats: {name: 'chema'},
      }),
    ).toEqual({name: 'chema'});
  });

  test('when resolved with RANDOM_VALUE, then should return []', () => {
    expect(
      filteredFlatsReducer([], {
        type: 'RANDOM_VALUE',
        filteredFlats: {name: 'chema'},
      }),
    ).toEqual([]);
  });

  test('when resolved with RANDOM_VALUE and undefined filteredFlats, then should return default user', () => {
    expect(
      filteredFlatsReducer(undefined, {
        type: 'RANDOM_VALUE',
      }),
    ).toEqual([]);
  });
});
