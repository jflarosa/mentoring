import axios from 'axios';

type GetWeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    weather_code: string;
  };

  current: {
    time: string; // ISO datetime
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
  };
};

export const getWeather = async (coordinates: readonly [string, string]) => {
  const response = await axios.get<GetWeatherResponse>(
    'https://api.open-meteo.com/v1/forecast',
    {
      params: {
        latitude: coordinates[0],
        longitude: coordinates[1],
      },
    },
  );

  return response.data;
};

export const getWeatherKey = (coordinates: readonly [string, string]) => [
  'weather',
  ...coordinates,
];