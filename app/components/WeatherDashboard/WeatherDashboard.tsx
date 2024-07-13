import React, { FC, useEffect, useRef, useState } from "react";

import { WeatherDashboardWrapper } from "./WeatherDashboard.styled";

import { fetchCities, fetchWeatherData } from "@/app/services/weatherApi";
import { errMsgInstance } from "@/app/utils/commonUtils";
import { toast } from "react-toastify";
import TemperatureChart from "../TemperatureChart/TemperatureChart.lazy";

interface WeatherDashboardProps {}

interface CityListType {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
}

interface Weathertypes {
  temperature: number[];
  time: string[];
}

const WeatherDashboard: FC<WeatherDashboardProps> = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<Weathertypes | null>(null);
  const [cityList, setCityList] = useState<CityListType[]>([]);
  const inRef = useRef<any>(null);

  const handleSearch = async (record: CityListType) => {
    try {
      let res = await fetchWeatherData(record.latitude, record.longitude);
      if (res && res.status === "success" && res.data.hourly) {
        setWeatherData({
          time: res.data.hourly.time.slice(0, 24),
          temperature: Object.values(res.data.hourly.temperature),
        });
        setCityList([]);
        setCity(
          `${record.admin2 ? record.admin2 + ", " : ""}${record.admin1}, ${
            record.country
          }`
        );
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(errMsgInstance(error));
    }
  };

  const handleKeyUp = (e: any) => {
    setCity(e.target.value);
    fetchCities(e.target.value).then((res) => {
      res && res.results && setCityList(res.results.slice(0, 5));
    });
  };

  const restAll = () => {
    setCity("");
    setCityList([]);
    setWeatherData(null);
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
              onChange={handleKeyUp}
              //   disabled={loading}
              ref={inRef}
            />
            <button className="btn btn-primary" onClick={restAll}>
              clear
            </button>
          </div>
          {cityList.map((item, i) => (
            <div
              className="card city-card"
              key={i}
              onClick={() => handleSearch(item)}
            >
              <div className="card-body">
                <p className="card-text">
                  {`${item.admin2 ? item.admin2 + ", " : ""}${item.admin1}, ${
                    item.country
                  }`}
                </p>
              </div>
            </div>
          ))}
          {weatherData && <TemperatureChart data={weatherData} />}
        </div>
      </div>
    </WeatherDashboardWrapper>
  );
};

export default WeatherDashboard;
