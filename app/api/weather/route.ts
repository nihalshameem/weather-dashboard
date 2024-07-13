import { NextResponse } from "next/server";

import axios from "axios";
import { fetchWeatherApi } from "openmeteo";

import { errMsgInstance } from "@/app/utils/commonUtils";

const url = process.env.WEATHER_URI || "";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export async function POST(request: Request): Promise<NextResponse> {
  var resData: object = {
    message: "Internal server error",
    data: [],
    status: "error",
  };
  try {
    var body: any = null;
    try {
      body = await request.json();
    } catch (error) {
      body = null;
    }
    console.log("🚀 ~ POST ~ body:", body);

    const responses = await fetchWeatherApi(url, {
      latitude: body.lat,
      longitude: body.long,
      hourly: "temperature_2m",
    });
    console.log("🚀 ~ POST ~ responses:", responses);
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    console.log("🚀 ~ POST ~ response:", response);

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    // const timezone = response.timezone();
    // const timezoneAbbreviation = response.timezoneAbbreviation();
    // const latitude = response.latitude();
    // const longitude = response.longitude();

    const hourly = response.hourly()!;
    console.log("🚀 ~ POST ~ hourly:", hourly)

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature: hourly.variables(0)!.valuesArray()!,
      },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    // for (let i = 0; i < weatherData.hourly.time.length; i++) {
    //   console.log(
    //     weatherData.hourly.time[i].toISOString(),
    //     weatherData.hourly.temperature[i]
    //   );
    // }

    resData = { message: "", data: weatherData, status: "success" };
  } catch (err: any) {
    console.log("🚀 ~ POST ~ err:", errMsgInstance(err));
    resData = { message: errMsgInstance(err), data: [], status: "error" };
  }
  return NextResponse.json(resData);
}
