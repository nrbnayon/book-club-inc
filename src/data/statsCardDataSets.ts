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
  // {
  //   title: "Delivered Orders",
  //   value: "1,342",
  //   trend: "up",
  //   trendValue: "15.8",
  //   trendColor: "text-green-600",
  //   sparklinePoints: [85, 92, 98, 105, 112, 108, 125, 138, 142, 148, 155, 162],
  // },
  {
    title: "Cancelled Orders",
    value: "73",
    trend: "down",
    trendValue: "5.4",
    trendColor: "text-red-500",
    sparklinePoints: [28, 32, 29, 25, 22, 20, 18, 16, 19, 15, 12, 10],
  },
  // {
  //   title: "Total Revenue",
  //   value: "$45,280",
  //   trend: "up",
  //   trendValue: "22.7",
  //   trendColor: "text-green-600",
  //   sparklinePoints: [
  //     2800, 3100, 3350, 3680, 3520, 3890, 4120, 4450, 4280, 4680, 4850, 5120,
  //   ],
  // },
  // {
  //   title: "Average Order Value",
  //   value: "$24.53",
  //   trend: "up",
  //   trendValue: "3.2",
  //   trendColor: "text-green-600",
  //   sparklinePoints: [18, 19, 21, 22, 20, 23, 25, 24, 26, 25, 27, 28],
  // },
  // {
  //   title: "Shipped Orders",
  //   value: "246",
  //   trend: "up",
  //   trendValue: "18.9",
  //   trendColor: "text-green-600",
  //   sparklinePoints: [32, 28, 35, 42, 38, 45, 52, 48, 55, 62, 58, 65],
  // },
  // {
  //   title: "Payment Pending",
  //   value: "94",
  //   trend: "down",
  //   trendValue: "12.3",
  //   trendColor: "text-red-500",
  //   sparklinePoints: [58, 52, 48, 45, 42, 38, 35, 32, 30, 28, 25, 22],
  // },
];

// Monthly performance data for detailed analytics
export const monthlyOrderStats: MetricData[] = [
  {
    title: "This Month Orders",
    value: "324",
    trend: "up",
    trendValue: "28.4",
    trendColor: "text-green-600",
    sparklinePoints: [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52],
  },
  {
    title: "Last Month Orders",
    value: "287",
    trend: "up",
    trendValue: "14.2",
    trendColor: "text-green-600",
    sparklinePoints: [20, 22, 25, 28, 26, 30, 32, 35, 33, 36, 38, 40],
  },
  {
    title: "Monthly Revenue",
    value: "$8,942",
    trend: "up",
    trendValue: "31.6",
    trendColor: "text-green-600",
    sparklinePoints: [
      450, 520, 580, 640, 680, 720, 780, 820, 860, 900, 940, 980,
    ],
  },
  {
    title: "Monthly Growth",
    value: "13.8%",
    trend: "up",
    trendValue: "4.2",
    trendColor: "text-green-600",
    sparklinePoints: [8, 9, 10, 12, 11, 13, 14, 15, 14, 16, 15, 17],
  },
];

// Payment method statistics
export const paymentMethodStats: MetricData[] = [
  {
    title: "Credit Card Orders",
    value: "892",
    trend: "up",
    trendValue: "16.2",
    trendColor: "text-green-600",
    sparklinePoints: [65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102],
  },
  {
    title: "PayPal Orders",
    value: "456",
    trend: "up",
    trendValue: "8.7",
    trendColor: "text-green-600",
    sparklinePoints: [32, 35, 38, 40, 42, 45, 47, 50, 48, 52, 54, 56],
  },
  {
    title: "Stripe Orders",
    value: "334",
    trend: "up",
    trendValue: "12.4",
    trendColor: "text-green-600",
    sparklinePoints: [22, 25, 28, 30, 32, 35, 37, 40, 42, 44, 46, 48],
  },
  {
    title: "COD Orders",
    value: "165",
    trend: "down",
    trendValue: "3.8",
    trendColor: "text-red-500",
    sparklinePoints: [25, 24, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10],
  },
];

// Status-based order statistics
export const orderStatusStats: MetricData[] = [
  {
    title: "Confirmed Orders",
    value: "412",
    trend: "up",
    trendValue: "19.3",
    trendColor: "text-green-600",
    sparklinePoints: [28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65],
  },
  {
    title: "Processing Orders",
    value: "168",
    trend: "up",
    trendValue: "7.8",
    trendColor: "text-green-600",
    sparklinePoints: [15, 18, 20, 22, 25, 23, 26, 28, 30, 32, 35, 38],
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
    title: "Failed Orders",
    value: "41",
    trend: "down",
    trendValue: "22.1",
    trendColor: "text-red-500",
    sparklinePoints: [25, 22, 20, 18, 15, 13, 11, 9, 8, 6, 5, 4],
  },
];

// Daily performance metrics
export const dailyOrderStats: MetricData[] = [
  {
    title: "Today's Orders",
    value: "47",
    trend: "up",
    trendValue: "24.8",
    trendColor: "text-green-600",
    sparklinePoints: [2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20],
  },
  {
    title: "Yesterday's Orders",
    value: "52",
    trend: "down",
    trendValue: "8.1",
    trendColor: "text-red-500",
    sparklinePoints: [25, 24, 22, 20, 18, 17, 15, 14, 12, 11, 10, 9],
  },
  {
    title: "Today's Revenue",
    value: "$1,247",
    trend: "up",
    trendValue: "18.6",
    trendColor: "text-green-600",
    sparklinePoints: [80, 95, 110, 125, 140, 155, 170, 185, 200, 215, 230, 245],
  },
  {
    title: "Peak Hour Orders",
    value: "12",
    trend: "up",
    trendValue: "33.3",
    trendColor: "text-green-600",
    sparklinePoints: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
];

// Customer-related order statistics
export const customerOrderStats: MetricData[] = [
  {
    title: "New Customer Orders",
    value: "289",
    trend: "up",
    trendValue: "26.4",
    trendColor: "text-green-600",
    sparklinePoints: [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55],
  },
  {
    title: "Returning Customer Orders",
    value: "1,558",
    trend: "up",
    trendValue: "11.7",
    trendColor: "text-green-600",
    sparklinePoints: [
      95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205,
    ],
  },
  {
    title: "Average Orders per Customer",
    value: "2.8",
    trend: "up",
    trendValue: "5.3",
    trendColor: "text-green-600",
    sparklinePoints: [
      2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2,
    ],
  },
  {
    title: "Customer Satisfaction",
    value: "4.7/5",
    trend: "up",
    trendValue: "2.1",
    trendColor: "text-green-600",
    sparklinePoints: [
      4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.8, 4.9, 4.8, 4.9,
    ],
  },
];