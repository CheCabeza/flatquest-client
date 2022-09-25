import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Favorites from './Favorites';
import thunk from 'redux-thunk';

jest.mock('@react-navigation/native');

describe('Given a Favorites component', () => {
  const mockStore = configureStore([thunk]);
  let store;
  let navigation;

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
        },
      ],
    });
    useNavigation.mockReturnValueOnce({
      navigate: jest.fn(),
    });
    navigation = {
      navigate: jest.fn(),
    };
  });

  test('Should render the Favorites of page', () => {
    const lobby = render(
      <Provider store={store}>
        <Favorites />
      </Provider>,
    );
    expect(lobby).toMatchSnapshot();
  });

  test('Then navigation.navigate is invoked', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Favorites navigation={navigation} />
      </Provider>,
    );
    const button = getByTestId('detailButton');
    fireEvent.press(button);
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
