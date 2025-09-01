import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useMemo, useState } from "react";
import { Select, Spin } from "antd";
import { useGetUserGrowthByYearQuery } from "../../redux/api/homePage/graphApi";

const UserGrowthChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
const [years] = useState(
  Array.from({ length: 5 }, (_, i) => currentYear - i).reverse()
);

  const { data, isLoading } = useGetUserGrowthByYearQuery(year);
  console.log("User Growth Data:", data);

  const monthMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const { monthlyData, maxUsers } = useMemo(() => {
    if (!data?.data?.monthlyStats) return { monthlyData: [], maxUsers: 0 };

    const stats = data.data.monthlyStats;

    const monthlyData = stats.map((item) => ({
      name: monthMap[item.month],
      totalUser: item.count,
    }));

    const maxUsers =
      Math.max(...stats.map((item) => item.count), 0) + 5; // add small padding

    return { monthlyData, maxUsers };
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{
            textAlign: "left",
            marginBottom: "15px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          📈 User Growth
        </h3>
        <Select
          className="min-w-32"
          value={year}
          placeholder="Select year"
          onChange={setYear}
          style={{
            marginBottom: "15px",
            width: "150px",
            fontWeight: "500",
          }}
          options={years.map((item) => ({ value: item, label: item }))}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[350px]">
          <Spin size="large" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00823b" stopOpacity={1} />
                <stop offset="95%" stopColor="#00823b" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis
              dataKey="name"
              stroke="#333"
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              stroke="#333"
              domain={[0, maxUsers]}
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0091ff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
              }}
              cursor={{ fill: "rgba(76, 175, 80, 0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: "13px", fontWeight: "bold" }} />
            <Bar
              dataKey="totalUser"
              fill="url(#colorUv)"
              barSize={75}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserGrowthChart;
