import axios, { AxiosError } from "axios";

export const errMsgInstance = (err: any) => {
  return typeof err === "string"
    ? err
    : err instanceof Error
    ? err.message
    : "An unknown error occurred";
};

export const handleApiError = (error: any) => { // Explicitly type error as any
    if (axios.isAxiosError(error)) {
      // AxiosError structure
      const axiosError = error as AxiosError<any>;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = axiosError.response;
        console.error(`Request failed with status ${status}:`, data);
        return (`Request failed with status ${status}: ${data.message}`);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('Request made but no response received:', axiosError.request);
        return ('Request made but no response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', axiosError.message);
        return (`Error setting up the request: ${axiosError.message}`);
      }
    } else {
      // Non-Axios error
      console.error('Non-Axios error occurred:', error);
      return (`Non-Axios error occurred: ${error.message}`);
    }
  };
