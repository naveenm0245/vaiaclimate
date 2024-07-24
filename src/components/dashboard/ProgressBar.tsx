"use client";
import { Card, ProgressCircle } from "@tremor/react";

export const ProgressCircleHero = () => (
  <div className="space-y-3">
    {/* <p className="text-center font-mono text-sm text-slate-500">
      Progress value as children
    </p> */}
    <Card className="mx-auto max-w-sm space-y-4">
      <h1 className="text-center font-mono text-sm text-slate-700">
        Carbon Neutrility Score
      </h1>
      <div className="flex justify-start space-x-5 items-center">
        <ProgressCircle value={75} size="lg" color="emerald" showAnimation >
          <span className="text-xs font-medium text-slate-700">75%</span>
        </ProgressCircle>
        <div>
          <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            $340/$450 (75%)
          </p>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Carbon Neutrility Achieved
          </p>
        </div>
      </div>
    </Card>
  </div>
);
