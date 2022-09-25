import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import * as actions from './../../redux/actions/actionCreators';
import Login from './Login';
import thunk from 'redux-thunk';

describe('Given a Login component', () => {
  const mockStore = configureStore([thunk]);
  let store;
  let navigation;

  beforeEach(() => {
    jest.spyOn(actions, 'login').mockReturnValueOnce({type: ''});
    jest.spyOn(actions, 'logout').mockReturnValueOnce({type: ''});
    jest.spyOn(actions, 'registerUser').mockReturnValueOnce({type: ''});
    store = mockStore({
      user: {
        email: 'ho@la.com',
        pass: '123123123',
      },
    });
    navigation = {
      navigate: jest.fn(),
    };
  });

  describe('When emailInput is typing with HELLO', () => {
    test('Then emailInput value is HELLO in lowerCase', () => {
      const {getByTestId} = render(
        <Provider store={store}>
          <Login />
        </Provider>,
      );
      const emailInput = getByTestId('emailInput');
      const text = 'HELLO';
      fireEvent.changeText(emailInput, text);

      expect(emailInput.props.value).toBe(text);
    });
  });

  describe('When passwordInput is typing with HELLO', () => {
    test('Then passwordInput value is HELLO', () => {
      const {getByTestId} = render(
        <Provider store={store}>
          <Login />
        </Provider>,
      );
      const passwordInput = getByTestId('passwordInput');
      const text = '1234';
      fireEvent.changeText(passwordInput, text);

      expect(passwordInput.props.value).toBe(text);
    });
  });

  describe('When login button is pressed', () => {
    test('Then navigation.navigate is invoked', () => {
      const {getByTestId} = render(
        <Provider store={store}>
          <Login />
        </Provider>,
      );
      const login = getByTestId('login');
      fireEvent.press(login);

      expect(actions.login).toHaveBeenCalled();
    });
  });

  describe('When logout button is pressed', () => {
    test('Then navigation.navigate is invoked', () => {
      store = mockStore({
        user: {
          email: 'ho@la.com',
          pass: '123123123',
          token: '123',
        },
      });
      const {getByTestId} = render(
        <Provider store={store}>
          <Login navigation={navigation} />
        </Provider>,
      );
      const logout = getByTestId('logout');
      fireEvent.press(logout);

      expect(actions.logout).toHaveBeenCalled();
    });
  });

  describe('When register button is pressed', () => {
    test('Then navigation.navigate is invoked', () => {
      const {getByTestId} = render(
        <Provider store={store}>
          <Login navigation={navigation} />
        </Provider>,
      );
      const register = getByTestId('register');
      fireEvent.press(register);

      expect(actions.registerUser).toHaveBeenCalled();
    });
  });
});
