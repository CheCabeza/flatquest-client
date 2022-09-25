import React from 'react';
import {render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Maps from './Maps';
import thunk from 'redux-thunk';

jest.mock('@react-navigation/native');

describe('Given a Maps component', () => {
  const mockStore = configureStore([thunk]);
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: {
          email: 'ho@la.com',
          pass: '123123123',
          favorites: [123],
        },
      },
      flats: [
        {
          _id: 123,
          photos: 'a',
          pros: ['glass', 'folder-open'],
          cons: ['money', 'copy'],
          reviews: ['Mierda de test'],
          coordinates: {latitude: 1, longitude: 2},
        },
      ],
    });
    useNavigation.mockReturnValueOnce({
      navigate: jest.fn(),
    });
  });

  test('Should render the Maps of page', () => {
    const lobby = render(
      <Provider store={store}>
        <Maps />
      </Provider>,
    );
    expect(lobby).toMatchSnapshot();
  });
});
