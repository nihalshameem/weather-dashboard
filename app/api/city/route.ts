import { errMsgInstance } from "@/app/utils/commonUtils";
import axios from "axios";
import { NextResponse } from "next/server";

const uri = process.env.CITY_SEARCH_URI || "";

const citySearch = axios.create({
  baseURL: process.env.CITY_SEARCH_URI,
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

    console.log("🚀 ~ POST ~ uri:", uri);

    const response = await axios.get(uri, {
      params: body,
      responseType: "json",
    });

    resData = response.data;

  } catch (err: any) {
    console.log("🚀 ~ POST ~ err:", errMsgInstance(err));
    resData = { message: errMsgInstance(err), data: [], status: "error" };
  }
  return NextResponse.json(resData);
}
