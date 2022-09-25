import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import FlatCards from './FlatCards';
import thunk from 'redux-thunk';
jest.mock('@react-navigation/native');

describe('Given a FlatCards component', () => {
  const mockStore = configureStore([thunk]);
  let store;
  let navigation;
  let flats = [
    {
      _id: 476,
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
  ];

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
      filteredFlats: [
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

    useNavigation.mockReturnValueOnce({
      navigate: jest.fn(),
    });
    navigation = {
      navigate: jest.fn(),
    };
  });

  test('Should render the FlatCards of page', () => {
    const Screen = render(
      <Provider store={store}>
        <FlatCards flatStore={flats} navigation={navigation} />
      </Provider>,
    );
    expect(Screen).toMatchSnapshot();
  });

  test('When flats_id !== user.user.favorites addFav is invoked', () => {
    flats = [
      {
        _id: 476,
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
    ];
    const Screen = render(
      <Provider store={store}>
        <FlatCards flatStore={flats} navigation={navigation} />
      </Provider>,
    );
    const button = Screen.getByTestId('FlatCardsButton');
    fireEvent.press(button);
    expect(Screen).toMatchSnapshot();
  });

  test('When flats_id === user.user.favorites removeFav is invoked', () => {
    flats = [
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
    ];
    const Screen = render(
      <Provider store={store}>
        <FlatCards flatStore={flats} navigation={navigation} />
      </Provider>,
    );
    const button = Screen.getByTestId('FlatCardsButton');
    fireEvent.press(button);
    expect(Screen).toMatchSnapshot();
  });

  test('Then navigation.navigate is invoked', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <FlatCards flatStore={flats} navigation={navigation} />
      </Provider>,
    );
    const button = getByTestId('FlatCard');
    fireEvent.press(button);
    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
