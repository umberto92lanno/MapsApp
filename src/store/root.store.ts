import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import bookReducers from '../ui/book/book.slice';
import rootSaga from './root.sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(...middlewares),
  reducer: {
    book: bookReducers,
  },
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
