import axios, { CancelTokenSource } from 'axios';
import { errMsgInstance } from '../utils/commonUtils';

// Closure to manage the cancel tokens for each request type
const createRequestManager = () => {
  let weatherCancelToken: CancelTokenSource | null = null;
  let citiesCancelToken: CancelTokenSource | null = null;

  // Function to make API requests with cancellation support
  const makeRequest = async (url: string, data: object, cancelToken: CancelTokenSource | null, setCancelToken: (token: CancelTokenSource) => void) => {
    // Cancel the previous request if it exists
    if (cancelToken) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Create a new cancel token
    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);

    try {
      const response = await axios.post(url, data, {
        cancelToken: newCancelToken.token,
      });

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Error making request:', errMsgInstance(error));
      }
      // throw error;
    }
  };

  // API methods
  const fetchWeatherData = async (lat: number, long: number) => {
    return makeRequest('/api/weather', { lat, long }, weatherCancelToken, (token) => {
      weatherCancelToken = token;
    });
  };

  const fetchCities = async (city: string) => {
    return makeRequest('/api/city', { name: city }, citiesCancelToken, (token) => {
      citiesCancelToken = token;
    });
  };

  return { fetchWeatherData, fetchCities };
};

const requestManager = createRequestManager();

export const fetchWeatherData = requestManager.fetchWeatherData;
export const fetchCities = requestManager.fetchCities;
