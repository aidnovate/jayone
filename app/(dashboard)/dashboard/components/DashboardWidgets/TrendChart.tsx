
import React from 'react';
import { Line } from 'react-chartjs-2';
import './chartjs-setup';

interface TrendChartProps {
  labels: string[];
  data: number[];
}

export default function TrendChart({ labels, data }: TrendChartProps) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24, marginTop: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Forms Purchased Trend</h3>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Forms Purchased',
              data,
              fill: false,
              borderColor: '#0070f3',
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
}
