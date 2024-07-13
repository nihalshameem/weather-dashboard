import axios from "axios";

import { errMsgInstance } from "../utils/commonUtils";

export const fetchWeatherData = async (lat: number, long: number) => {
  try {
    const response = await axios.post("/api/weather", {
      lat: lat,
      long: long,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", errMsgInstance(error));
    throw error;
  }
};

export const fetchCities = async (city: string) => {
  try {
    const response = await axios.post("/api/city", {
      name: city,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", errMsgInstance(error));
    throw error;
  }
};
