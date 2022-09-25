import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Details from './Details';
import thunk from 'redux-thunk';

describe('Given a Details component', () => {
  const mockStore = configureStore([thunk]);
  let store;
  let navigation;
  let route;

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
        },
      ],
    });
    route = {
      params: {
        flatId: 123,
      },
    };
    navigation = {
      navigate: jest.fn(),
    };
  });

  test('Should render the lobby of page', () => {
    const lobby = render(
      <Provider store={store}>
        <Details route={route} navigation={navigation} />
      </Provider>,
    );
    expect(lobby).toMatchSnapshot();
  });

  test('Then navigation.navigate is invoked', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Details route={route} navigation={navigation} />
      </Provider>,
    );
    const button = getByTestId('editButton');
    fireEvent.press(button);
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
