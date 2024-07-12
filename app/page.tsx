import Head from "next/head";

import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard.lazy";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer />
        <h1 className="text-center mt-4">Weather Dashboard</h1>
        <WeatherDashboard />
      </main>
    </div>
  );
}
