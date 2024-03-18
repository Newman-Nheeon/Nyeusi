import React from "react";

const cards = [
  {
    title: "Total Participants",
    numbers: 200,
    icon: "close.svg",
  },
  {
    title: "Total Number of approved entries",
    numbers: 200,
    icon: "close.svg",
  },
  {
    title: "Number of entries pending approval",
    numbers: 200,
    icon: "close.svg",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-semibold font-mont text-white">
          Overview
        </h1>
        <button className="yellow_btn">End Competition</button>
      </div>

      <div className="">
        {cards.map((card, i) => (
          <div className="flex">
            <div className="flex-col">
              <h1>{card.title}</h1>
              <h1>{card.numbers}</h1>
            </div>
            <img src={`/assets/icons/${card.icon}`} alt={card.title} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Dashboard;
