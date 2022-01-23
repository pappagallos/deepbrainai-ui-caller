import {ACT_SAVE_CALLING, RDU_SAVE_CALLING} from '../reducers/calling';
import {all, fork, put, takeEvery} from '@redux-saga/core/effects';

function* saveCalling({payload}) {
  yield put({type: RDU_SAVE_CALLING, payload});
}

function* watchSaveCalling() {
  yield takeEvery(ACT_SAVE_CALLING, saveCalling);
}

export default function* callingSaga() {
  yield all([fork(watchSaveCalling)]);
}
