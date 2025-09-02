"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import React, { useMemo } from "react";

// Updated orderStats data for the three categories
const orderStats = [
  {
    id: "earning",
    title: "Total Earning",
    data: {
      monthly: {
        amount: 15420.0,
        period: "monthly",
        increasePercent: 15,
        timePeriod: "30 days",
        trendPercent: 15,
        isPositiveTrend: true,
      },
    },
    borderColor: "border-blue",
    accentColor: "text-blue",
    textColor: "text-blue",
  },
  {
    id: "pending",
    title: "Total Pending",
    data: {
      monthly: {
        amount: 8942.5,
        period: "monthly",
        increasePercent: -5,
        timePeriod: "30 days",
        trendPercent: -5,
        isPositiveTrend: false,
      },
    },
    borderColor: "border-yellow",
    accentColor: "text-yellow",
    textColor: "text-yellow",
  },
  {
    id: "cancel",
    title: "Total Cancel",
    data: {
      monthly: {
        amount: 3210.5,
        period: "monthly",
        increasePercent: -8,
        timePeriod: "30 days",
        trendPercent: -8,
        isPositiveTrend: false,
      },
    },
    borderColor: "border-gray",
    accentColor: "text-gray",
    textColor: "text-gray",
  },
];

// Monthly revenue data with both current and last year data
const monthlyRevenueData = [
  { month: "Jan", currentYear: 45, lastYear: 50 },
  { month: "Feb", currentYear: 18, lastYear: 42 },
  { month: "Mar", currentYear: 32, lastYear: 40 },
  { month: "Apr", currentYear: 25, lastYear: 42 },
  { month: "May", currentYear: 35, lastYear: 43 },
  { month: "Jun", currentYear: 25, lastYear: 43 },
  { month: "Jul", currentYear: 28, lastYear: 32 },
  { month: "Aug", currentYear: 38, lastYear: 43 },
  { month: "Sep", currentYear: 25, lastYear: 43 },
  { month: "Oct", currentYear: 32, lastYear: 43 },
  { month: "Nov", currentYear: 35, lastYear: 42 },
  { month: "Dec", currentYear: 25, lastYear: 43 },
];

// Types for better type safety
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}



// Custom Tooltip Component for Bar Chart
const CustomBarTooltip: React.FC<TooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </p>
        {payload.map((pld, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: pld.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {pld.name}: {pld.value}K
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Tooltip Component for Pie Chart
const CustomPieTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { percentage: string };
  }>;
}> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {data.name}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {data.payload.percentage}
        </p>
      </div>
    );
  }
  return null;
};

export const AnalyticsChart = () => {
  // Calculate category analytics data based on orderStats (for pie chart)
  const categoryAnalyticsData = useMemo(() => {
    const earning =
      orderStats.find((stat) => stat.id === "earning")?.data.monthly?.amount ||
      0;
    const pending =
      orderStats.find((stat) => stat.id === "pending")?.data.monthly?.amount ||
      0;
    const cancel =
      orderStats.find((stat) => stat.id === "cancel")?.data.monthly?.amount ||
      0;

    const total = earning + pending + cancel;

    return [
      {
        name: "Total Earning",
        percentage: `${((earning / total) * 100).toFixed(1)}%`,
        value: (earning / total) * 100,
        color: "#88AAFF",
      },
      {
        name: "Total Pending",
        percentage: `${((pending / total) * 100).toFixed(1)}%`,
        value: (pending / total) * 100,
        color: "#FAEB92",
      },
      {
        name: "Total Cancel",
        percentage: `${((cancel / total) * 100).toFixed(1)}%`,
        value: (cancel / total) * 100,
        color: "#303030",
      },
    ];
  }, []);

  // Calculate max value for Y-axis
  const maxValue = useMemo(() => {
    const allValues = monthlyRevenueData.flatMap((d) => [
      d.currentYear,
      d.lastYear,
    ]);
    return Math.ceil(Math.max(...allValues));
  }, []);

  // Generate Y-axis ticks
  const yAxisTicks = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => Math.round((maxValue / 5) * i));
  }, [maxValue]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[400px]">
      {/* Monthly Revenue Card */}
      <Card className="w-full lg:w-2/3 bg-white dark:bg-[#081524]  rounded-3xl h-[400px] lg:h-full">
        <CardHeader className="pb-2 lg:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 gap-2 sm:gap-0">
            <div>
              <CardTitle className="font-medium text-foreground text-sm sm:text-base">
                Monthly Revenue
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Earning over last year
              </p>
            </div>
            {/* Legend for bar chart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#003ACA]" />
                <span className="text-xs text-muted-foreground">Last year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#88AAFF]" />
                <span className="text-xs text-muted-foreground">
                  Current year
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-2 h-[350px] lg:h-[calc(100%-20px)]">
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenueData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barGap={4}
                barCategoryGap="20%"
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#ACACAC" }}
                  className="text-xs sm:text-sm"
                  stroke="none"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#ACACAC" }}
                  className="text-xs sm:text-sm"
                  tickFormatter={(value: number) => `${value}K`}
                  domain={[0, maxValue]}
                  ticks={yAxisTicks}
                />
                <Tooltip
                  content={<CustomBarTooltip />}
                  cursor={{ fill: "rgba(200, 200, 200, 0.1)" }}
                />
                <Bar
                  dataKey="lastYear"
                  fill="#003ACA"
                  name="Last year"
                  barSize={16}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="currentYear"
                  fill="#88AAFF"
                  name="Current year"
                  barSize={16}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Analytics pie chart */}
      <Card className="w-full lg:w-1/3 bg-background dark:bg-[#081524] rounded-3xl h-auto lg:h-full">
        <CardHeader className="pb-2 lg:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 md:px-2 gap-2 sm:gap-0">
            <div>
              <CardTitle className="font-medium text-foreground text-sm sm:text-base">
                Earning Activity
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                last month earning activity
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-2 sm:px-4 h-auto lg:h-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 pb-6 lg:pb-4">
          {/* Pie Chart Container */}
          <div className="w-full lg:w-full h-[200px] sm:h-[220px] lg:h-[250px] bg-input dark:bg-transparent rounded-3xl">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryAnalyticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                  cornerRadius={8}
                >
                  {categoryAnalyticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      strokeWidth={0}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col w-full lg:w-full items-center gap-2 sm:gap-3 p-2 sm:p-4">
            {categoryAnalyticsData.map((category, index) => (
              <div key={index} className="w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="font-normal text-foreground text-sm sm:text-base leading-5 sm:leading-6">
                      {category.name}
                    </div>
                  </div>
                  <div className="font-semibold text-foreground text-sm sm:text-base leading-5 sm:leading-6">
                    {category.percentage}
                  </div>
                </div>
                {index < categoryAnalyticsData.length - 1 && (
                  <div className="w-full h-px bg-border my-2 sm:my-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
