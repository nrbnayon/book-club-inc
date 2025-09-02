// src/components/common/StatsCard.tsx
import React from "react";
import PropTypes from "prop-types";
import { AlarmClockPlus, TrendingUp, TrendingDown } from "lucide-react";
import { MetricCardProps, MetricData } from "@/types/statsCardDataTypes";

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendValue,
  trendColor,
  sparklinePoints,
}) => {
  const generateSparklinePath = (points: number[]): string => {
    if (!points || points.length === 0) return "";

    const width = 120;
    const height = 40;
    const maxValue = Math.max(...points);
    const minValue = Math.min(...points);
    const range = maxValue - minValue || 1;

    // Convert points to coordinates
    const coords = points.map((point, index) => ({
      x: (index / (points.length - 1)) * width,
      y: height - ((point - minValue) / range) * height,
    }));

    if (coords.length < 2) return "";

    let path = `M ${coords[0].x} ${coords[0].y}`;

    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];

      if (i === 1) {
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        path += ` Q ${curr.x} ${curr.y} ${midX} ${midY}`;
      } else if (i === coords.length - 1) {
        path += ` Q ${prev.x} ${prev.y} ${curr.x} ${curr.y}`;
      } else {
        const next = coords[i + 1];
        const midX = (curr.x + next.x) / 2;
        const midY = (curr.y + next.y) / 2;
        path += ` Q ${curr.x} ${curr.y} ${midX} ${midY}`;
      }
    }

    return path;
  };

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-lg border border-primary/30 p-6 relative shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
          aria-label="More options"
        >
          <AlarmClockPlus size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
          <div className="flex items-center gap-1">
            <TrendIcon
              size={16}
              className={trend === "up" ? "text-green-500" : "text-red-500"}
            />
            <span className={`text-sm font-medium ${trendColor}`}>
              {trendValue}% vs last month
            </span>
          </div>
        </div>

        {/* Sparkline chart */}
        <div className="w-30 h-12">
          <svg width="120" height="48" className="overflow-visible">
            <defs>
              <linearGradient
                id={`gradient-${trend}-${title.replace(/\s+/g, "")}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={trend === "up" ? "#10b981" : "#ef4444"}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={trend === "up" ? "#10b981" : "#ef4444"}
                  stopOpacity="0.05"
                />
              </linearGradient>
            </defs>

            <path
              d={`${generateSparklinePath(sparklinePoints)} L 120 48 L 0 48 Z`}
              fill={`url(#gradient-${trend}-${title.replace(/\s+/g, "")})`}
            />

            <path
              d={generateSparklinePath(sparklinePoints)}
              stroke={trend === "up" ? "#10b981" : "#ef4444"}
              strokeWidth="2.5"
              fill="none"
              className="drop-shadow-sm"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.oneOf(["up", "down"]).isRequired,
  trendValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  trendColor: PropTypes.string.isRequired,
  sparklinePoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

interface StatsCardProps {
  metrics?: MetricData[];
}

const StatsCard: React.FC<StatsCardProps> = ({ metrics = [] }) => {
  // Early return if no metrics
  if (!metrics || metrics.length === 0) {
    return (
      <div className="mx-auto">
        <div className="text-center text-gray-500">No metrics available</div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={`${metric.title}-${index}`}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendValue={metric.trendValue}
            trendColor={metric.trendColor}
            sparklinePoints={metric.sparklinePoints}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
