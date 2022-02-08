import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, call, put, delay, take, select } from 'typed-redux-saga';
import { callApi } from '../../sagas/callApi';
import { BookLists, getBooksLists, getMarkers } from './api/api.book';
import { bookActions } from './book.slice';

function* callBook() {
    try {
        const response = yield* callApi(getBooksLists);
        if (!response) {
            return;
        }
        yield* put(bookActions.callBookSuccess(response));
    } catch {
        yield* put(bookActions.callBookError());
    }
}

function* filterBook() {
    const action = yield* take<PayloadAction<BookLists[] | undefined>>([
        bookActions.callBookSuccess.type,
        bookActions.callBookError.type,
    ]);
    if (action.type === bookActions.callBookError.type) {
        console.log('errorrrrrr');
        return;
    }
    const list = action.payload;
    // const list = yield* select((state: RootState) => state.book.list);
}

function* callMarkers() {
    try {
        const response = yield* callApi(getMarkers);
        if (!response) {
            return;
        }
        yield* put(bookActions.callMarkersSuccess(response));
    } catch {
        yield* put(bookActions.callMarkersError());
    }
}

function* bookSaga() {
    yield* takeLatest(bookActions.callBookLoading.type, callBook);
    yield* takeLatest(bookActions.callBookLoading.type, filterBook);
    yield* takeLatest(bookActions.callMarkersLoading.type, callMarkers);
}

export default bookSaga;
