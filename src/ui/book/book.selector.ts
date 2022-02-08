import {RootState} from '../../store/root.store';

export const getBikes = (state: RootState) => {
  return state.book.markers;
};
