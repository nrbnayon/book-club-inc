// src/types/statsCardDataSets.ts
import { MetricData } from "@/types/statsCardDataTypes";

// Dummy data for StatsCard
export const defaultMetrics: MetricData[] = [
  {
    title: "Total earning",
    value: "$2,420",
    trend: "up",
    trendValue: "40",
    trendColor: "text-green-600",
    sparklinePoints: [15, 18, 16, 22, 25, 23, 28, 32, 30, 35, 38, 42],
  },
  {
    title: "Total order",
    value: "1,210",
    trend: "down",
    trendValue: "10",
    trendColor: "text-red-500",
    sparklinePoints: [35, 32, 34, 30, 28, 25, 23, 20, 18, 22, 19, 16],
  },
  {
    title: "Total User",
    value: "316",
    trend: "up",
    trendValue: "20",
    trendColor: "text-green-600",
    sparklinePoints: [8, 12, 15, 18, 16, 20, 24, 27, 25, 30, 28, 32],
  },
];


export const orderMetrics: MetricData[] = [
  {
    title: "Total Orders",
    value: "1,847",
    trend: "up",
    trendValue: "12.5",
    trendColor: "text-green-600",
    sparklinePoints: [
      120, 135, 148, 162, 158, 174, 189, 195, 188, 202, 215, 224,
    ],
  },
  {
    title: "Pending Orders",
    value: "186",
    trend: "up",
    trendValue: "8.2",
    trendColor: "text-green-600",
    sparklinePoints: [45, 38, 42, 48, 52, 46, 50, 55, 58, 54, 62, 65],
  },
  {
    title: "Cancelled Orders",
    value: "73",
    trend: "down",
    trendValue: "5.4",
    trendColor: "text-red-500",
    sparklinePoints: [28, 32, 29, 25, 22, 20, 18, 16, 19, 15, 12, 10],
  },
];

// Status-based order statistics
export const orderStatusStats: MetricData[] = [
  {
    title: "Total Payout",
    value: "1012",
    trend: "up",
    trendValue: "40",
    trendColor: "text-green-600",
    sparklinePoints: [28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65],
  },
  {
    title: "Refunded Orders",
    value: "29",
    trend: "down",
    trendValue: "15.2",
    trendColor: "text-red-500",
    sparklinePoints: [18, 16, 14, 12, 10, 8, 7, 6, 5, 4, 3, 2],
  },
  {
    title: "Total Failed",
    value: "41",
    trend: "down",
    trendValue: "22.1",
    trendColor: "text-red-500",
    sparklinePoints: [25, 22, 20, 18, 15, 13, 11, 9, 8, 6, 5, 4],
  },
];

// Daily performance metrics
export const userStats: MetricData[] = [
  {
    title: "Total Subscription",
    value: "1247",
    trend: "up",
    trendValue: "24.8",
    trendColor: "text-green-600",
    sparklinePoints: [2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20],
  },
  {
    title: "Total User",
    value: "1452",
    trend: "down",
    trendValue: "8.1",
    trendColor: "text-red-500",
    sparklinePoints: [25, 24, 22, 20, 18, 17, 15, 14, 12, 11, 10, 9],
  },
  {
    title: "Acive User",
    value: "400",
    trend: "up",
    trendValue: "8.1",
    trendColor: "text-green-500",
    sparklinePoints: [2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20],
  },
];

