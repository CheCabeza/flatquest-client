import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Filter from './Filter';
import thunk from 'redux-thunk';

jest.mock('@react-navigation/native');

describe('Given a Filter component', () => {
  const mockStore = configureStore([thunk]);
  let store;
  const filterByFace = jest.fn();
  const setFormValues = jest.fn();

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
          neighborhood: 'El Gòtic',
          face: [
            {type: 'frown', votes: '7'},
            {type: 'grin', votes: '3'},
            {type: 'smile', votes: '1'},
            {type: 'meh', votes: '0'},
          ],
        },
        {
          _id: 123,
          photos: 'a',
          pros: ['glass', 'folder-open'],
          cons: ['money', 'copy'],
          reviews: ['Mierda de test'],
          neighborhood: 'El Gòtic',
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
          neighborhood: 'El Gòtic',
          face: [
            {type: 'frown', votes: '7'},
            {type: 'grin', votes: '3'},
            {type: 'smile', votes: '1'},
            {type: 'meh', votes: '0'},
          ],
        },
      ],
      filteredByFace: [
        {
          _id: 123,
          photos: 'a',
          pros: ['glass', 'folder-open'],
          cons: ['money', 'copy'],
          reviews: ['Mierda de test'],
          neighborhood: 'El Gòtic',
          face: [
            {type: 'frown', votes: '7'},
            {type: 'grin', votes: '3'},
            {type: 'smile', votes: '1'},
            {type: 'meh', votes: '0'},
          ],
        },
      ],
    });

    useNavigation.mockReturnValueOnce({
      navigate: jest.fn(),
    });
  });

  test('Should render the Filter of page', () => {
    const filterScreen = render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );
    expect(filterScreen).toMatchSnapshot();
  });

  test('Then filterByFace is invoked when pressing frownButton', () => {
    const filterScreen = render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );
    const button = filterScreen.getByTestId('frownButton');
    fireEvent.press(button);
    expect(filterScreen).toMatchSnapshot();
  });

  test('Then filterByFace is invoked when pressing mehButton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );
    const button = getByTestId('mehButton');
    fireEvent.press(button);
    expect(filterByFace).not.toHaveBeenCalled();
  });

  test('Then filterByFace is invoked when pressing smileButton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );
    const smileButton = getByTestId('smileButton');
    fireEvent.press(smileButton);
    expect(filterByFace).not.toHaveBeenCalled();
  });

  test('Then filterByFace is invoked when pressing grinButton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <Filter />
      </Provider>,
    );
    const grinButton = getByTestId('grinButton');
    fireEvent.press(grinButton);
    expect(filterByFace).not.toHaveBeenCalled();
  });
});
