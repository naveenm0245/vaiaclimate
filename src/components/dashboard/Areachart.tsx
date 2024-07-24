"use client";
import { AreaChart, Card } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 23",
    "Scope1 Emission": 289,
    "Scope2 Emission": 233,
  },
  {
    date: "Feb 28",
    "Scope1 Emission": 320,
    "Scope2 Emission": 245,
  },
  {
    date: "Mar 27",
    "Scope1 Emission": 350,
    "Scope2 Emission": 280,
  },
  {
    date: "April 28",
    "Scope1 Emission": 305,
    "Scope2 Emission": 267,
  },
  {
    date: "May 27",
    "Scope1 Emission": 325,
    "Scope2 Emission": 360,
  },
  {
    date: "Jun 27",
    "Scope1 Emission": 356,
    "Scope2 Emission": 305,
  },
  {
    date: "Jul 27",
    "Scope1 Emission": 310,
    "Scope2 Emission": 280,
  },
  {
    date: "Aug 28",
    "Scope1 Emission": 320,
    "Scope2 Emission": 290,
  },
  {
    date: "Sep 27",
    "Scope1 Emission": 290,
    "Scope2 Emission": 305,
  },
  // ...
  {
    date: "Oct 27",
    "Scope1 Emission": 283,
    "Scope2 Emission": 247,
  },
];

export default function Example() {
  return (
    <Card className="max-w-4xl">
      <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Total CO<sub>2</sub> Emission in FY2024-25
      </span>
      <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        3,568 Ton eCO<sub>2</sub>
      </p>
      <AreaChart
        className="mt-2 h-80"
        data={chartdata}
        index="date"
        categories={["Scope1 Emission", "Scope2 Emission"]}
        colors={["indigo", "teal"]}
        yAxisWidth={33}
        animationDuration={1000}
        showAnimation
      />
    </Card>
  );
}
