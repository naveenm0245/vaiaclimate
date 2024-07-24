"use client";

import { BarChart } from "@tremor/react";

const chartdata = [
  {
    name: "Product Manufacturing",
    "eCO2 Emission": 2488,
  },
  {
    name: "Raw Materials",
    "eCO2 Emission": 1445,
  },
  {
    name: "Product Used",
    "eCO2 Emission": 743,
  },
  {
    name: "Transporation",
    "eCO2 Emission": 281,
  },
  {
    name: "End of Life Product Process",
    "eCO2 Emission": 251,
  },
  {
    name: "Direct Emissions",
    "eCO2 Emission": 232,
  },
  {
    name: "Energy Inefficiency",
    "eCO2 Emission": 98,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarChartHero = () => (
  <BarChart
    data={chartdata}
    index="name"
    categories={["eCO2 Emission"]}
    colors={["teal", "pink", "fuchsia", "purple", "indigo", "blue", "cyan"]}
    valueFormatter={dataFormatter}
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
    showAnimation
    animationDuration={1000}
  />
);
