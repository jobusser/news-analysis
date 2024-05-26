import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartTooltip from './chartTooltip';

function VolumeChart({ data }) {

  const formattedData = data.map(entry => {
    const date = new Date(
      // YYYYMMDDTHHMMSSZ to date object
      entry.date.substring(0, 4),
      Number(entry.date.substring(4, 6)) - 1,
      entry.date.substring(6, 8),
      entry.date.substring(9, 11),
      entry.date.substring(11, 13),
      entry.date.substring(13, 15)
    );

    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));

    const day = String(localDate.getDate()) + " " + localDate.toLocaleString('default', { month: 'long' }) + ", " + String(localDate.getFullYear());
    const time = String(localDate.getHours()) + ":" + String(localDate.getMinutes());

    return {
      ...entry,
      day: day,
      time: time,
    };
  });

  return null;
  /* return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formattedData}>
        <XAxis dataKey="date" tick={false} />
        <YAxis />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ fill: 'transparent' }}
        />
        <Bar
          dataKey="value"
          fill="#8884fa"
          radius={[10, 10, 0, 0]}
          onMouseEnter={(data, index, e) => e.target.style.fill = '#ffffff'}
          onMouseLeave={(data, index, e) => e.target.style.fill = '#8884d8'}
        />
      </BarChart>
    </ResponsiveContainer>
  ); */
}

export default VolumeChart;
