import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Bike, BookLists} from './api/api.book';

export interface BookState {
  list: BookLists[];
  status: string;
  markers: Bike[];
}

const initialState: BookState = {
  list: [],
  status: 'success',
  markers: [],
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    callBookLoading: state => ({
      ...state,
      status: 'loading',
    }),
    callBookSuccess: (state, action: PayloadAction<BookLists[]>) => ({
      ...state,
      list: action.payload,
      status: 'success',
    }),
    callBookError: state => ({
      ...state,
      status: 'error',
    }),
    interrupt: state => ({
      ...state,
      status: 'success',
    }),
    callMarkersLoading: state => ({
      ...state,
      status: 'loading',
    }),
    callMarkersSuccess: (state, action: PayloadAction<any[]>) => ({
      ...state,
      markers: action.payload,
      status: 'success',
    }),
    callMarkersError: state => ({
      ...state,
      status: 'error',
    }),
  },
});

// Action creators are generated for each case reducer function
export const bookActions = {...bookSlice.actions};

export default bookSlice.reducer;
