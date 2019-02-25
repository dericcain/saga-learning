import { takeEvery, call, fork, put } from 'redux-saga/effects';

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

const usersSagas = [fork(watchUsersRequest)];

export default usersSagas;
