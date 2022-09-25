import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import EditFlatReview from './EditFlatReview';
import thunk from 'redux-thunk';

jest.mock('react-native-gesture-handler');

describe('Given a EditFlatReview component', () => {
  const mockStore = configureStore([thunk]);
  let store;
  let route;

  beforeEach(() => {
    store = mockStore({
      flats: [
        {
          _id: 123,
          photos: 'a',
          pros: ['glass', 'folder-open'],
          cons: ['money', 'copy'],
          reviews: ['Mierda de test'],
          face: [
            {type: 'frown', votes: '7'},
            {type: 'grin', votes: '3'},
            {type: 'smile', votes: '1'},
            {type: 'meh', votes: '0'},
          ],
        },
      ],
      user: {
        user: {
          email: 'ho@la.com',
          pass: '123123123',
          favorites: [123, 456],
        },
      },
    });
    route = {
      params: {
        flatId: 123,
      },
    };
  });

  test('Should render the EditFlatReview of page', () => {
    const Screen = render(
      <Provider store={store}>
        <EditFlatReview route={route} />
      </Provider>,
    );
    expect(Screen).toMatchSnapshot();
  });
});
