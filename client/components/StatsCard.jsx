import React from "react";

const cards = [
  {
    title: "Total Participants",
    numbers: 0,
    icon: "people.svg",
  },
  {
    title: "Total approved entries",
    numbers: 0,
    icon: "tick-circle.svg",
  },
  {
    title: "Total pending entries",
    numbers: 0,
    icon: "danger.svg",
  },
  {
    title: "Total declined entries",
    numbers: 0,
    icon: "close-circle.svg",
  },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center place-content-start gap-4 text-white ">
      {cards.map((card, i) => (
        <div
          className="flex items-start justify-between border-solid border-2 border-slate-600 rounded-xl py-6 px-4"
          key={i}
        >
          <div className="flex-col lg:w-[200px] w-[300px]">
            <h5 className="text-sm font-medium pb-2 font-mont">{card.title}</h5>
            <h1 className="text-3xl font-semibold font-mont">{card.numbers}</h1>
          </div>
          <img
            src={`/assets/icons/${card.icon}`}
            alt={card.title}
            className="text-white"
          />
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
