import { takeEvery, takeLatest, call, fork, put } from 'redux-saga/effects';

import { Types, getUsersSuccess } from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(getUsersSuccess({
      items: result.data.data,
    }));
  } catch (e) {
    console.error(e);
  }
}

function* watchUsersRequest() {
  yield takeEvery(Types.GET_USERS_REQUEST, getUsers);
}

function* createUser(action) {
  try {
    yield call(api.createUser, action.payload.firstName, action.payload.lastName);
    yield call(getUsers);
  } catch (error) {
    throw new Error(error);
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(Types.CREATE_USER_REQUEST, createUser);
}

const usersSagas = [fork(watchUsersRequest), fork(watchCreateUserRequest)];

export default usersSagas;
