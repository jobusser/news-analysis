import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartTooltip from './chartTooltip';
import { useCountry } from "../../../context/countryProvider";

function VolumeChart() {
  const { newsOverview } = useCountry();

  if (!newsOverview || !newsOverview.timeline) {
    return <div></div>;
  }

  const formattedData = newsOverview.timeline.map((entry, index, array) => {
    const isTimeNull = array.slice(0, 2).every(e => e.date.getHours() === 0 && e.date.getMinutes() === 0);

    const day = String(entry.date.getDate()) + " " + entry.date.toLocaleString('default', { month: 'long' }) + ", " + String(entry.date.getFullYear());
    const time = isTimeNull ? null : String(entry.date.getHours()).padStart(2, '0') + ":" + String(entry.date.getMinutes()).padStart(2, '0');

    return {
      ...entry,
      day: day,
      time: time,
    };
  });

  const containsCountryOrAverage = formattedData.some(d => d.countryCoverageMagnitude !== undefined || d.averageCoverageMagnitude !== undefined);

  return (
    <ResponsiveContainer width="100%" >
      {containsCountryOrAverage ? (
        <LineChart data={formattedData}>
          <XAxis dataKey="date" tick={false} />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {formattedData.some(d => d.countryCoverageMagnitude !== undefined) && (
            <Line
              type="monotone"
              dataKey="countryCoverageMagnitude"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              name="Country Coverage"
              isAnimationActive={false}
            />
          )}
          {formattedData.some(d => d.averageCoverageMagnitude !== undefined) && (
            <Line
              type="monotone"
              dataKey="averageCoverageMagnitude"
              stroke="#cccccc"
              strokeWidth={2}
              dot={false}
              name="Average Coverage"
              isAnimationActive={false}
            />
          )}
        </LineChart>
      ) : (
        <LineChart data={formattedData}>
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(tick) => Number.isInteger(tick) ? tick : ''} />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {formattedData.some(d => d.value !== undefined) && (
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              name="Number of Articles"
              isAnimationActive={false}
            />
          )}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}

export default VolumeChart;

