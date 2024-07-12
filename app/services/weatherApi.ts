import axios from "axios";

import { errMsgInstance } from "../utils/commonUtils";

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.post("/api/weather", {
      q: city,
    });
    return response;
  } catch (error) {
    console.error("Error fetching weather data:", errMsgInstance(error));
    throw error;
  }
};
