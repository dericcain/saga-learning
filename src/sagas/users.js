import { takeEvery, takeLatest, call, fork, put, take } from 'redux-saga/effects';

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

function* deleteUser(userId) {
  try {
    yield call(api.deleteUser, userId);
    yield call(getUsers);
  } catch (error) {
    throw new Error(error);
  }
}

function* watchDeleteUserRequest() {
  while(true) {
    const action = yield take(Types.DELETE_USER_REQUEST, deleteUser);
    yield call(deleteUser, action.payload.userId);
  }
}

const usersSagas = [
  fork(watchUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];

export default usersSagas;
