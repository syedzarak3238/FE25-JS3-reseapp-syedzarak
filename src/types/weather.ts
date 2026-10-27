export type GeocodingResponse = {
  results?: { latitude: number; longitude: number }[];
};

export type ForecastResponse = {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
};

export type Weather = {
  temperature: number;
  windSpeed: number;
  code: number;
};
