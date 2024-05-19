"use client";
import React from "react";
import BarChart from "./component/bar_chart";
import PieChart from "./component/pie_chart";
import axiosInstance from "../configurations/api/axiosInstance";
import useSWR from "swr";
import { useState } from "react";
import SelectBox from "./component/select";

interface ResultItem {
  name: string;
  count: number;
}

interface Data {
  results: ResultItem[];
}

interface ChargeItem {
  name: string;
  totalPurchase: number;
  count: number;
}

interface ChargeData {
  results: ChargeItem[];
}

interface InternetChargeItem {
  name: string;
  totalPurchaseOriginalAmount: number;
  totalPurchaseTaxIncludedAmount: number;
  count: number;
}

interface InternetChargeData {
  results: InternetChargeItem[];
}

const Page = () => {
  const [showBased, setShowBase] = useState<string>("1");
  const [showresult, setShowresult] = useState<string>("1");

  const getbills = async () => {
    const response = await axiosInstance.get(
      "http://192.168.106.6:5270/api/v1/reports/bills/overall"
    );
    console.log(response.data);
    return response.data;
  };

  const getCharges = async () => {
    const response = await axiosInstance.get(
      "http://192.168.106.6:7169/api/v1/reports/charges/overall"
    );
    console.log(response.data);
    return response.data;
  };

  const getInternetPackage = async () => {
    const response = await axiosInstance.get(
      "http://192.168.106.6:7169/api/v1/reports/internet-packages/overall"
    );
    return response.data;
  };

  const {
    data: charge,
    error: chargeerror,
    isLoading: isLoading6,
  } = useSWR("/api/charge", getCharges);

  const {
    data: internet,
    error: errorenternet,
    isLoading: isLoading2,
  } = useSWR("/api/internet", getInternetPackage);

  const {
    data: billsData,
    error: billsError,
    isLoading: billsLoading,
  } = useSWR("/api/bills", getbills);

  const transformBarChartChargeInternet = (
    internetData: InternetChargeData | null
  ): (string | number)[][] => {
    if (!internetData)
      return [["Company", "Original Amount", "Tax Included Amount"]];

    const transformed: (string | number)[][] = [
      ["Company", "مبلغ بدون احتساب مالیات", "مبلغ با احتساب مالیات"],
    ];

    internetData.results.forEach((item) => {
      if (showBased === "0") {
        transformed.push([item.name, item.count, 0]);
      } else {
        transformed.push([
          item.name,
          item.totalPurchaseOriginalAmount,
          item.totalPurchaseTaxIncludedAmount,
        ]);
      }
    });

    return transformed;
  };

  const transformBarChartCharge = (
    data: ChargeData | null
  ): (string | number)[][] => {
    if (!data) return [];
    const transformed: (string | number)[][] = [
      ["Company", "Total Purchase", "Count"],
    ];
    data.results.forEach((item) => {
      if (showresult === "0") {
        transformed.push([item.name, item.count, 0]);
      } else {
        transformed.push([item.name, item.totalPurchase, 0]);
      }
    });
    return transformed;
  };

  const transformPieChartBills = (data: Data | null): (string | number)[][] => {
    if (!data) return [];
    const transformed: (string | number)[][] = [["Name", "Count"]];
    data.results.forEach((item) => {
      transformed.push([item.name, item.count]);
    });
    return transformed;
  };

  const pieChartData = transformPieChartBills(billsData);

  const barChartDataInternet = transformBarChartChargeInternet(internet);
  const barChartDataCharge = transformBarChartCharge(charge);
  const data = [
    { label: "تعداد", value: 0 },
    { label: "مبلغ ", value: 1 },
  ];

  return (
    <div className="flex justify-center items-center h-screen flex-col w-full ">
      <div className="w-full pl-8">
        <SelectBox
          onChange={(e) => {
            const value = e.target.value;
            setShowBase(value);
          }}
          show={data}
          label="نمایش بر اساس"
        />
      </div>

      <div className="flex flex-col mb-8 md:flex-row">
        <div className="w-full md:w-1/2 justify-center md:justify-start">
          {isLoading2 && <div>Loading...</div>}
          {errorenternet && <div>Error loading data</div>}
          {!isLoading2 && !errorenternet && (
            <BarChart title="by" data={barChartDataInternet} />
          )}
        </div>
        <div
          style={{ marginRight: "20%" }}
          className="w-full md:w-1/2 justify-center md:justify-end"
        >
          {isLoading6 && <div>Loading...</div>}
          {billsError && <div>Error loading data</div>}
          {!isLoading6 && !billsError && <PieChart data={pieChartData} />}
        </div>
      </div>
      <div>
        <div className="w-full pl-8">
          <SelectBox
            onChange={(e) => {
              const value = e.target.value;
              // setShowBase(value);
              setShowresult(value);
            }}
            show={data}
            label="نمایش بر اساس"
          />
        </div>
        {isLoading6 && <div>Loading...</div>}
        {chargeerror && <div>Error loading data</div>}
        {!isLoading6 && !chargeerror && (
          <BarChart title="by" data={barChartDataCharge} />
        )}
      </div>
      <div style={{ height: "100px", width: "100%" }}></div>
    </div>
  );
};

export default Page;
