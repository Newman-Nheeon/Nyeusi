import React from "react";
import StatsCard from "./StatsCard";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 ">
        <h1 className="text-3xl font-semibold font-mont text-white">
          Overview
        </h1>
        <button className="yellow_btn">End Competition</button>
      </div>
      <StatsCard />
    </div>
  );
};

export default Dashboard;
