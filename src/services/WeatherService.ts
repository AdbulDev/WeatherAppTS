import axios from 'axios';

const API_KEY = '830b0ea2790c5efd29f56ef56b1bcfda';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city: string) => {
  const response = await axios.get(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}`,
  );
  return response.data;
};
