import { errMsgInstance } from "@/app/utils/commonUtils";
import axios from "axios";
import { NextResponse } from "next/server";

const apiKey = process.env.WEATHER_KEY; // Replace with your API key
console.log("🚀 ~ apiKey:", apiKey);

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

    resData = await weatherApi.get("weather", {
      params: {
        q: body?.city,
        appid: apiKey,
        units: "metric", // Adjust units as per your preference (metric, imperial)
      },
    });
    console.log("🚀 ~ POST ~ resData:", resData)
    // resData;
  } catch (err: any) {
    resData = { message: errMsgInstance(err), data: [], status: "error" };
  }
  // console.log("🚀 ~ POST ~ result:", resData);
  return NextResponse.json(resData);
}
