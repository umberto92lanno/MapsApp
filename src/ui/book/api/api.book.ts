import axios from 'axios';

export interface BookLists {
  display_name: string;
  list_name: string;
  updated: string;
}

export interface BikeResponse {
  android: string;
  bike_id: string;
  ios: string;
  is_disabled: number;
  is_reserved: number;
  lat: 45.078778;
  lon: 7.674779;
  vehicle_type: string;
}

export interface Bike {
  android: string;
  bike_id: string;
  ios: string;
  is_disabled: number;
  is_reserved: number;
  latitude: 45.078778;
  longitude: 7.674779;
  vehicle_type: string;
  icon: string;
}

export const getBooksLists = async (): Promise<BookLists[]> => {
  // const callApi = httpClient.call<GenericApiResponse<BookLists[]>>('lists/names.json', HttpMethod.get, {
  //     params: {
  //         'api-key': 'PL0DUwFZ0UJh3fKqix45dkOlFgzzsnFk',
  //     }
  // });
  // const response = await callApi.call();
  // return response.data.results;
  const response = await axios.get(
    'https://api.nytimes.com/svc/books/v3/lists/names.json',
    {
      params: {
        'api-key': 'PL0DUwFZ0UJh3fKqix45dkOlFgzzsnFk',
      },
    },
  );
  console.log(response.data.results);
  return response.data.results;
};

export const getMarkers = async (): Promise<Bike[]> => {
  const response = await axios.get(
    'https://api.helbiz.com/admin/reporting/torino/gbfs/free_bike_status.json',
  );
  console.log(response.data);
  const bikes: BikeResponse[] = response.data.data.bikes;
  return bikes.map(bike => ({
    ...bike,
    latitude: bike.lat,
    longitude: bike.lon,
    icon:
      bike.vehicle_type === 'scooter'
        ? 'https://www.iconsdb.com/icons/download/royal-blue/scooter-2-64.png'
        : 'https://www.iconsdb.com/icons/download/barbie-pink/map-marker-2-64.png',
  }));
};
