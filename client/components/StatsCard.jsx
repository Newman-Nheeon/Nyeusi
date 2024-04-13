"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const StatsCard = () => {
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalApprovedEntries, setTotalApprovedEntries] = useState(0);
  const [totalPendingEntries, setTotalPendingEntries] = useState(0);
  const [totalDeclineEntries, setTotalDeclineEntries] = useState(0);
  const [isLoad, stats] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const apiURLTotal = `${apiBaseURL}/admin/total-participant`;
      const apiURLApproved = `${apiBaseURL}/admin/count-approve`;
      const apiURLDecline = `${apiBaseURL}/admin/count-decline`;
      const apiURLPending = `${apiBaseURL}/admin/count-pending`;

// How to use the API for handling approve and decline, not for counting ooo, you can remove the code, 
// just showing you how to correctly use a dynamic API like this /approve/:participantId

      const apiApprove =`${apiBaseURL}/admin/approve/${participantID}`
      const apiDecline =`${apiBaseURL}/admin/decline/${participantID}`

      try {
        const [
          totalParticipantsResponse,
          totalApprovedEntriesResponse,
          totalPendingEntriesResponse,
          totalDeclinedEntriesResponse,
        ] = await Promise.all([
          axios.get(apiURLTotal),
          axios.get(apiURLApproved),
          axios.get(apiURLDecline),
        ]);
        setTotalParticipants(totalParticipantsResponse.data.totalParticipants);
        console.log(setTotalParticipants);
        setTotalApprovedEntries(
          totalApprovedEntriesResponse.data.totalApprovedEntries
        );
        setTotalDeclineEntries(
          totalDeclinedEntriesResponse.data.totalDeclineEntries
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Total Participants",
      numbers: totalParticipants ? "Loading..." : totalParticipants,
      icon: "people.svg",
    },
    {
      title: "Total approved entries",
      numbers: totalApprovedEntries,
      icon: "tick-circle.svg",
    },
    {
      title: "Total pending entries",
      numbers: totalPendingEntries,
      icon: "danger.svg",
    },
    {
      title: "Total declined entries",
      numbers: totalDeclineEntries,
      icon: "close-circle.svg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center place-content-start gap-4 text-white mb-10">
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