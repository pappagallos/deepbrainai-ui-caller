import {all, fork} from '@redux-saga/core/effects';
import callingSaga from './calling';
import callListSaga from './callList';
import waitingListSaga from './waitingList';

export default function* rootSaga() {
  yield all([fork(waitingListSaga), fork(callListSaga), fork(callingSaga)]);
}
