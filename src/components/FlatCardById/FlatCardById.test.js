import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import FlatCardById from './FlatCardById';
import thunk from 'redux-thunk';
jest.mock('@react-navigation/native');

describe('Given a FlatCardById component', () => {
  const mockStore = configureStore([thunk]);
  let store;
  let navigation;
  let route;
  let flatId;

  beforeEach(() => {
    store = mockStore({
      user: {
        email: 'ho@la.com',
        pass: '123123123',
      },
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
      filteredFlats: [
        {
          _id: 123,
          photos: 'a',
          pros: ['glass', 'folder-open'],
          cons: ['money', 'copy'],
          reviews: ['Mierda de test'],
        },
      ],
    });
    flatId = 123;
    route = {
      params: {
        flatId: 123,
      },
    };
    useNavigation.mockReturnValueOnce({
      navigate: jest.fn(),
    });
    navigation = {
      navigate: jest.fn(),
    };
  });

  test('Should render the lobby of page', () => {
    const Screen = render(
      <Provider store={store}>
        <FlatCardById route={route} navigation={navigation} />
      </Provider>,
    );
    expect(Screen).toMatchSnapshot();
  });

  test('Then navigation.navigate is invoked', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <FlatCardById flatId={flatId} navigation={navigation} />
      </Provider>,
    );
    const button = getByTestId('FlatCardByIdPressable');
    fireEvent.press(button);
    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
