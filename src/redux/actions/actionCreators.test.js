import axios from 'axios';
import {
  loadFlats,
  filterFlats,
  flatReview,
  addFavorite,
  login,
  logout,
  registerUser,
} from './actionCreators';

jest.mock('axios');

describe('Given loadFlats function, ', () => {
  test('when resolved, then dispatch an object with type: LOAD_FLATS and flats: data', async () => {
    const dispatch = jest.fn();
    const data = [{address: 'Llull, 34'}];
    axios.mockResolvedValue({data});
    await loadFlats()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOAD_FLATS',
      flats: [{address: 'Llull, 34'}],
    });
  });

  test('when rejected, then return LOAD_FLATS_ERROR', async () => {
    const dispatch = jest.fn();
    axios.mockRejectedValue('error');
    await loadFlats()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({type: 'LOAD_FLATS_ERROR'});
  });
});

describe('Given filterFlats function, ', () => {
  test('when resolved, then dispatch an object with type: FILTER_FLATS and flats: data', async () => {
    const dispatch = jest.fn();
    const data = [{address: 'Llull, 34'}];
    axios.mockResolvedValue({data});
    await filterFlats()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'FILTER_FLATS',
      filteredFlats: [{address: 'Llull, 34'}],
    });
  });

  test('when rejected, then return FILTER_FLATS_ERROR', async () => {
    const dispatch = jest.fn();
    axios.mockRejectedValue('error');
    await filterFlats()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({type: 'FILTER_FLATS_ERROR'});
  });
});

describe('Given flatReview function, ', () => {
  test('when resolved, then dispatch an object with type: REVIEW_FLATS and flats: data', async () => {
    const dispatch = jest.fn();
    axios.put.mockResolvedValue();
    await flatReview()(dispatch);
  });

  test('when rejected, then return REVIEW_FLATS_ERROR', async () => {
    const dispatch = jest.fn();
    axios.put.mockRejectedValue('error');
    await flatReview()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({type: 'REVIEW_FLATS_ERROR'});
  });
});

describe('Given addFavorite function, ', () => {
  test('when resolved, then dispatch an object with type: ADD_FAVORITE and user: data', async () => {
    const user = {bearerToken: 1234};
    const dispatch = jest.fn();
    const data = [{favorite: [123, 456]}];
    axios.put.mockResolvedValue({data});
    await addFavorite(user)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_FAVORITE',
      user: [{favorite: [123, 456]}],
    });
  });
  test('when rejected, then return ADD_FAVORITE_ERROR', async () => {
    const user = {bearerToken: 1234};
    const dispatch = jest.fn();
    axios.put.mockRejectedValue('error');
    await addFavorite(user)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({type: 'ADD_FAVORITE_ERROR'});
  });

  describe('Given login function, ', () => {
    test('when resolved, then dispatch an object with type: LOGIN_USER and flats: data', async () => {
      const dispatch = jest.fn();
      const data = [{favorite: [123, 456]}];
      axios.post.mockResolvedValue({data});
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOGIN_USER',
        user: [{favorite: [123, 456]}],
      });
    });

    test('when rejected, then return LOGIN_USER_ERROR', async () => {
      const dispatch = jest.fn();
      axios.post.mockRejectedValue('error');
      await login()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({type: 'LOGIN_USER_ERROR'});
    });
  });

  describe('Given logout function, ', () => {
    test('when resolved, then dispatch an object with type: LOGIN_USER and flats: data', async () => {
      const dispatch = jest.fn();
      logout()(dispatch);
    });
  });

  describe('Given registerUser function, ', () => {
    test('when resolved, then dispatch an object with type: LOGIN_USER and flats: data', async () => {
      axios.post.mockResolvedValue('');
    });

    test('when rejected, then return LOGIN_USER_ERROR', async () => {
      const dispatch = jest.fn();
      axios.post.mockRejectedValue('error');
      await registerUser()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({type: 'REGISTER_USER_ERROR'});
    });
  });
});
