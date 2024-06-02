import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartTooltip from './chartTooltip';
import { useCountry } from "../../../context/countryProvider";

function VolumeChart() {
  const { newsOverview, worldVolume } = useCountry();
  const [color, setColor] = useState("#8884d8");

  function getColor(percentage) {
    if (typeof percentage === "number") {
      const intensity = Math.min(1, percentage / 10);
      const red = 255;
      const green = Math.round(255 * (1 - intensity));
      const blue = 0;
      return 'rgb(' + red + ', ' + green + ', ' + blue + ', 0.9)';

    } else {
      return '#8884d8';
    }
  }

  useEffect(() => {
    if (newsOverview) {
      if (!worldVolume) {
        var fraction = '?'
      } else if (!newsOverview.selectedRegion) {
        // world selected
        var fraction = (newsOverview.totalInWorld !== 0) ? newsOverview.relevantInWorld / newsOverview.totalInWorld : 0;

      } else if (newsOverview.selectedRegion && worldVolume[newsOverview.selectedRegion]) {
        // country with info
        var fraction = worldVolume[newsOverview.selectedRegion];

      } else {
        var fraction = '?';
      }
    }
    setColor(getColor(fraction));
  }, [newsOverview, worldVolume]
  );

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
    <ResponsiveContainer width="100%" height={300}>
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
              stroke={color}
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
          <XAxis dataKey="day" tick={false} />
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

