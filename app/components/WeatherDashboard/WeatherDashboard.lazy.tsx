"use client"
import React, { lazy, Suspense } from 'react';

const LazyWeatherDashboard = lazy(() => import('./WeatherDashboard'));

const WeatherDashboard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWeatherDashboard {...props} />
  </Suspense>
);

export default WeatherDashboard;
