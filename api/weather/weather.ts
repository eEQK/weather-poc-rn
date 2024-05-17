import { fetchWeatherApi } from 'openmeteo';
import { City } from '../cities/cities';

export type ConditionsCurrent = {
  city: City

  temp: number
  apparentTemp: number
  precipitation: number
  pressure: number
  windSpeed: number
}

export type ConditionsHourly = {
  city: City

  time: Date[]
  temp: Float32Array
  apparentTemp: Float32Array
  precipitation: Float32Array
  pressure: Float32Array
  windSpeed: Float32Array
}

async function fetchCurrentConditions(city: City): Promise<ConditionsCurrent> {
  const cached = localStorage.getItem(JSON.stringify(city));
  if (cached) {
    return JSON.parse(cached);
  }

  const params = {
    "latitude": city.lat,
    "longitude": city.long,
    "current": ["temperature_2m", "apparent_temperature", "precipitation", "surface_pressure", "wind_speed_10m"],
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const current = responses[0].current()!;
  const result = {
    city: city,
    temp: current.variables(0)!.value(),
    apparentTemp: current.variables(1)!.value(),
    precipitation: current.variables(2)!.value(),
    pressure: current.variables(3)!.value(),
    windSpeed: current.variables(4)!.value(),
  }

  if (result) {
    // cache so that we don't run out of free API calls during development
    // don't do this in production
    localStorage.setItem(JSON.stringify(city), JSON.stringify(result));
  }

  return result;
}

async function fetchHourlyConditions(city: City): Promise<ConditionsHourly> {
  const cached = localStorage.getItem(JSON.stringify(['hourly', city]));
  if (cached) {
    return JSON.parse(cached);
  }

  const params = {
    "latitude": city.lat,
    "longitude": city.long,
    "hourly": ["temperature_2m", "apparent_temperature", "precipitation", "surface_pressure", "wind_speed_10m"],
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const hourly = responses[0].hourly()!;
  const utcOffsetSeconds = responses[0].utcOffsetSeconds();
  const result = {
    city: city,
    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
      (t) => new Date((t + utcOffsetSeconds) * 1000)
    ),
    temp: hourly.variables(0)!.valuesArray()!,
    apparentTemp: hourly.variables(1)!.valuesArray()!,
    precipitation: hourly.variables(2)!.valuesArray()!,
    pressure: hourly.variables(3)!.valuesArray()!,
    windSpeed: hourly.variables(4)!.valuesArray()!,
  }

  if (result) {
    // cache so that we don't run out of free API calls during development
    // don't do this in production
    localStorage.setItem(JSON.stringify(['hourly', city]), JSON.stringify(result));
  }

  return result;
}

export const WeatherApi = {
  fetchCurrentConditions,
  fetchHourlyConditions,
}
