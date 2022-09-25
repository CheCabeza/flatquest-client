import flatsReducer from './flatsReducer';
import actionTypes from '../actions/actionTypes';

describe('Given filteredBByFaceReducer function ', () => {
  test('when resolved with FILTER_FLATS_FACE, then should return filteredFlats data', () => {
    expect(
      flatsReducer([], {
        type: actionTypes.LOAD_FLATS,
        flats: {addess: 'poblenou'},
      }),
    ).toEqual({addess: 'poblenou'});
  });

  test('when resolved with RANDOM_VALUE, then should return []', () => {
    expect(
      flatsReducer([], {
        type: 'RANDOM_VALUE',
        filteredFlats: {addess: 'poblenou'},
      }),
    ).toEqual([]);
  });

  test('when resolved with RANDOM_VALUE and undefined flats, then should return default flats', () => {
    expect(
      flatsReducer(undefined, {
        type: 'RANDOM_VALUE',
      }),
    ).toEqual([]);
  });
});
