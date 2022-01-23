import {
  ACT_SAVE_WAITING_LIST,
  RDU_SAVE_WAITING_LIST,
} from '../reducers/waitingList';
import {all, fork, put, takeEvery} from '@redux-saga/core/effects';

function* saveWaiting({payload}) {
  yield put({type: RDU_SAVE_WAITING_LIST, payload});
}

function* watchSaveWaiting() {
  yield takeEvery(ACT_SAVE_WAITING_LIST, saveWaiting);
}

export default function* waitingListSaga() {
  yield all([fork(watchSaveWaiting)]);
}
