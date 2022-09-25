import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import configureStore from 'redux-mock-store';
import List from './List';
import thunk from 'redux-thunk';
jest.mock('@react-navigation/native');

describe('Given a Login component', () => {
  const mockStore = configureStore([thunk]);
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        email: 'ho@la.com',
        pass: '123123123',
      },
      flats: [],
      filteredFlats: [],
    });
    useNavigation.mockReturnValueOnce({
      navigate: jest.fn(),
    });
  });

  describe('When searchInput is typing with joan', () => {
    test('Then searchInput value is joan', () => {
      const {getByTestId} = render(
        <Provider store={store}>
          <List />
        </Provider>,
      );
      const searchInput = getByTestId('searchInput');
      const text = 'joan';
      fireEvent.changeText(searchInput, text);

      expect(searchInput.props.value).toBe(text);
    });
  });
});
