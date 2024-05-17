import cities from './cities.json';

export type City = {
  name: string;

  lat: number;
  long: number;

  voivodeship: string;
};


function listCities(): City[] {
  return cities.map<City>((city: any) => {
    return {
      name: city.city,
      lat: city.lat,
      long: city.lng,
      voivodeship: city.admin_name,
    };
  })
}


export const CitiesApi = {
  list: listCities(),
}
