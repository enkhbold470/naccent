"use client";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, Radar } from "react-chartjs-2";
import { useState, useEffect } from "react";

import { pronunciationAccuracy, fluencyScores } from "@/lib/data";

// Add interface for props
interface ChartProps {
  data?: {  // Add question mark here to make it optional
    radar: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
      }[];
    };
    bar: {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
      }[];
    };
  } | null;
}

export default function Charts({ data = null }: ChartProps) {
  const [animatedRadarData, setAnimatedRadarData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [animatedBarData, setAnimatedBarData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // If no data provided, use default data
    const chartData = data || {
      radar: pronunciationAccuracy,
      bar: fluencyScores,
    };

    // Animate radar chart
    const radarAnimation = {
      labels: chartData.radar.labels,
      datasets: chartData.radar.datasets.map((dataset: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
      }) => ({
        ...dataset,
        data: new Array(dataset.data.length).fill(0),
      })),
    };

    // Animate bar chart
    const barAnimation = {
      labels: chartData.bar.labels,
      datasets: [
        {
          ...chartData.bar.datasets[0],
          data: new Array(chartData.bar.datasets[0].data.length).fill(0),
        },
      ],
    };

    setAnimatedRadarData(radarAnimation);
    setAnimatedBarData(barAnimation);

    // Animate over 3 seconds
    const startTime = Date.now();
    const duration = 3000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Update radar data
      setAnimatedRadarData({
        labels: chartData.radar.labels,
        datasets: chartData.radar.datasets.map((dataset: {
          label: string;
          data: number[];
          backgroundColor: string;
          borderColor: string;
          borderWidth: number;
        }) => ({
          ...dataset,
          data: dataset.data.map((value: number) => value * progress),
        })),
      });

      // Update bar data
      setAnimatedBarData({
        labels: chartData.bar.labels,
        datasets: [
          {
            ...chartData.bar.datasets[0],
            data: chartData.bar.datasets[0].data.map(
              (value: number) => value * progress
            ),
          },
        ],
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Pronunciation Analysis</CardTitle>
          Compare current and previous session metrics
        </CardHeader>
        <CardContent>
          <Radar 
            data={animatedRadarData}
            options={{
              scales: {
                r: {
                  min: 0,
                  max: 100,
                  beginAtZero: true,
                  angleLines: {
                    display: true
                  },
                  ticks: {
                    stepSize: 20
                  }
                }
              }
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fluency Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={animatedBarData} />
        </CardContent>
      </Card>
    </div>
  );
}
