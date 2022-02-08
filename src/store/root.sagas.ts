import {all} from 'redux-saga/effects';
import bookSaga from '../ui/book/book.sagas';

export default function* rootSaga() {
  yield all([bookSaga()]);
}
