"use client";

import React from "react";
import { Chart } from "react-google-charts";
import { colors } from "@/app/configurations/theme/colors";
import SelectBox from "../select";

interface LegendItem {
  text: string;
  backgroundColor: string;
  textcolor?: string;
}
const SelectItem = [
  { label: " تعداد خرید", value: 0 },
  { label: "مبلغ خرید ", value: 1 },
];
interface BarChartProps {
  data: any[][];
  title: string;
  label?: LegendItem[] | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Add this line
}

export const options = {
  legend: { position: "none" },
  colors: [colors.blue[800], colors.turquoise[400]],
  bar: {
    groupWidth: "30%",
  },
  series: {
    0: {
      visibleInLegend: true,
      color: colors.blue[800],
      lineWidth: 10,
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
  titleTextStyle: {
    textAlign: "right",
  },
  hAxis: {
    direction: -1,
  },
};

export const datas = [
  ["Year", "Sales", "Expenses"],
  ["2014", 1000, 400],
  ["2015", 1170, 460],
  ["2016", 660, 1120],
  ["2017", 1030, 540],
];

function BarChart({ data, title, label, onChange }: BarChartProps) {
  return (
    <>
      <div className="bg-white rounded-2xl w-full sm:w-1/3 flex justify-center flex-col mt-4">
        <div className="font-bold text-lg mt-4 mr-8">{title}</div>
        <Chart
          style={{ direction: "rtl" }}
          options={{ ...options }}
          chartType="ColumnChart"
          width="100%"
          height="240px"
          data={data}
        />

        <div className="flex flex-row justify-between w-full">
          <SelectBox
            onChange={onChange}
            show={SelectItem}
            label={SelectItem ? "" : "hi"}
          />

          <div className="flex flex-col justify-start items-start  mb-10 mt-10 ml-5 ">
            {label &&
              label.map((legend, index) => (
                <div className="flex flex-row items-center mb-2" key={index}>
                  <div
                    style={{
                      width: "29px",
                      height: "15px",
                      backgroundColor: legend.backgroundColor,
                      marginTop: "20px",
                    }}
                  ></div>
                  <span
                    style={{ color: legend.textcolor }}
                    className="mr-3 mt-3 whitespace-nowrap text-black"
                  >
                    {legend.text}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div style={{ height: "40px", width: "100%" }}></div>
    </>
  );
}

export default BarChart;
