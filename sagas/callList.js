import {ACT_SAVE_CALL_LIST, RDU_SAVE_CALL_LIST} from '../reducers/callList';
import {all, fork, put, takeEvery} from '@redux-saga/core/effects';

function* saveCallList({payload}) {
  yield put({type: RDU_SAVE_CALL_LIST, payload});
}

function* watchSaveCallList() {
  yield takeEvery(ACT_SAVE_CALL_LIST, saveCallList);
}

export default function* callListSaga() {
  yield all([fork(watchSaveCallList)]);
}
