import {Bike} from '../../book/api/api.book';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {bookActions} from '../../book/book.slice';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "../../../hooks/useLocation";
import { Alert } from "react-native";

enum RideType {
  scooter,
  all,
}

export const useBikeMapLogic = (markers: Bike[]) => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState(RideType.all);

  const markersLoading = useCallback(() => {
    dispatch(bookActions.callMarkersLoading());
  }, [dispatch]);

  const onPressFilter = useCallback(() => {
    setType(type === RideType.scooter ? RideType.all : RideType.scooter);
  }, [type]);

  const markersFiltered = useMemo(() => {
    if (type === RideType.scooter) {
      return markers.filter(marker => marker.vehicle_type === 'scooter');
    }
    return markers;
  }, [markers, type]);

  const onPressMarker = useCallback(
    (id: string) => {
      console.log(markers.find(marker => marker.bike_id === id));
    },
    [markers],
  );

  return {
    markersLoading,
    onPressFilter,
    markersFiltered,
    onPressMarker,
  };
};
