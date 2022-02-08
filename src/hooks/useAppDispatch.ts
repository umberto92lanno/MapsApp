import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/root.store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
