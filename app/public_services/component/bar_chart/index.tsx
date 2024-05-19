"use client";

import React from "react";
import { Chart } from "react-google-charts";
import { colors } from "@/app/configurations/theme/colors";

interface BarChartProps {
  data: any[][];
  title: string;
}

export const options = {
  colors: [colors.blue[800], colors.turquoise[400]],
  bar: {
    groupWidth: "20%",
  },
  series: {
    0: {
      visibleInLegend: true,
      color: colors.blue[800],
      lineWidth: "50px",
    },
    1: {
      visibleInLegend: true,
      color: colors.turquoise[400],
      lineWidth: 2,
    },
  },
  annotations: {
    textStyle: {
      fontSize: 12,
    },
  },
};

function BarChart({ data, title }: BarChartProps) {
  return (
    <div
      style={{
        marginLeft: "60px",
        backgroundColor: "white",
        width: "750px",
        height: "340px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid white",
        borderRadius: "26px",
      }}
    >
      <Chart
        style={{ borderRadius: "50%", direction: "ltr" }}
        options={{ ...options, title: title }} // Add title directly to options as a string
        chartType="ColumnChart"
        width={"700px"}
        height={"322px"}
        data={data}
      />
    </div>
  );
}

export default BarChart;
