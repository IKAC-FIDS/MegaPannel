"use client";
import React from "react";
import { Chart } from "react-google-charts";
import config from "@/tailwind.config";
import { colors } from "@/app/configurations/theme/colors";
interface pieChartProps {
  data: any[][];
}

const blue = config.theme;
const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
  colors: [
    colors.blue[800],
    colors.rhino[900],
    colors.sorbus[600],
    colors.magentafuchsia[600],
  ],
  titleTextStyle: {
    textAlign: "left", // ساب‌تایتل اصلی به سمت راست
  },
  subtitleTextStyle: {
    textAlign: "left", // ساب‌تایتل فرعی به سمت راست
  },
};

function PieChart({ data }: pieChartProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "360px",
        height: "340px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid white",
        borderRadius: "26px",
      }}
    >
      <Chart
        style={{ direction: "rtl" }}
        chartType="PieChart"
        data={data}
        options={options}
        width={"340px"}
        height={"322px"}
      />
    </div>
  );
}

export default PieChart;
