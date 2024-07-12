import React, { FC, useState } from 'react';

import { WeatherDashboardWrapper } from './WeatherDashboard.styled';

import { fetchWeatherData } from '@/app/services/weatherApi';
import { errMsgInstance } from '@/app/utils/commonUtils';
import { toast } from 'react-toastify';


interface WeatherDashboardProps { }

const WeatherDashboard: FC<WeatherDashboardProps> = () => {
   const [city, setCity] = useState('');
   const [weatherData, setWeatherData] = useState<any | null>(null);

   const handleSearch = async () => {
      try {
         let res = await fetchWeatherData(city);
         if (res && res.data && res?.data?.status === "success") {
            setWeatherData(res.data);
         } else {
            toast.error(res?.data?.message)
         }
      } catch (error) {
         toast.error(errMsgInstance(error));
      }
   };

   return (
      <WeatherDashboardWrapper className="container mt-4">
         <div className="row">
            <div className="col-md-6 offset-md-3">
               <div className="input-group mb-3">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Enter city name"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleSearch}>
                     Search
                  </button>
               </div>
               {weatherData && (
                  <div className="card">
                     <div className="card-body">
                        <h5 className="card-title">{weatherData.name}</h5>
                        <p className="card-text">
                           Temperature: {weatherData.main.temp} °C
                        </p>
                        <p className="card-text">
                           Description: {weatherData.weather[0].description}
                        </p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </WeatherDashboardWrapper>
   )
};

export default WeatherDashboard;
