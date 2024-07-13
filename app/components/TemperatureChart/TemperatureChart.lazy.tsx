import React, { lazy, Suspense } from "react";
import { TemperatureChartProps } from "./TemperatureChart";

const LazyTemperatureChart = lazy(() => import("./TemperatureChart"));

const TemperatureChart: React.FC<TemperatureChartProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyTemperatureChart {...props} />
  </Suspense>
);

export default TemperatureChart;
