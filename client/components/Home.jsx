"use client";
import cookie from "cookie";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "./StatsCard";
import TableData from "./TableData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { info } from "autoprefixer";
import { Result } from "postcss";
import useCompetitionState from "./useCompetitionState";

const statusOptions = ["All", "pending", "approved", "declined"];

export default function Dashboard() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [participants, setParticipants] = useState([]);
  const [filterParticipants, setFilterParticipants] = useState([]);

  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const competitionState = useCompetitionState();

  const fetchParticipants = async () => {
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiURL = `${apiBaseURL}/admin/total-participant`;
    setSelectedStatus("all");
    try {
      const response = await axios.get(apiURL);
      setParticipants(response.data.participants);
      setFilterParticipants(response.data.participants);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const competitionState = async () => {
      try {
        const response = await fetch(`${apiBaseURL}/admin/competition-state`);
        if (!response.ok) {
          throw new Error("Failed to fetch competition state");
        }
        const data = await response.json();
        if (data.isActive === false) {
          setStart(true);
          setEnd(false);
        } else {
          setStart(false);
          setEnd(true);
        }
      } catch (error) {
        console.error("Error fetching competition state:", error);
        // Handle error state if needed
      }
    };

    competitionState();
  }, []);

  const handleStatusSelect = (value) => {
    setSelectedStatus(value);
  };

  const handleStart = async () => {
    const startAPI = `${apiBaseURL}/admin/start`;

    try {
      const response = await axios.post(startAPI);
      setStart(response);
    } catch (error) {
      console.error("Error starting competition");
    }
  };
  const handleEnd = async () => {
    const endAPI = `${apiBaseURL}/admin/end`;

    try {
      const endResponse = await fetch(endAPI, { method: "PATCH" });
      if (endResponse.status == 200) {
        alert("Competition ended");
      }
    } catch (error) {
      console.error("Error ending competition");
    }
  };

  const handleSearchFilter = async () => {
    const filterAPI = `${apiBaseURL}/admin/total-participant?status=${selectedStatus}`;
    try {
      const filterResponse = await axios.get(filterAPI);
      if (filterResponse.status == 200) {
        if (search != "" || search != null) {
          setFilterParticipants(
            filterResponse.data.participants.filter(
              (participant) =>
                participant.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                participant.lastName
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
          );
        } else {
          setFilterParticipants(filterResponse.data.participants);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle approve of participant
  const handleApprove = async (participantID) => {
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiURL = `${apiBaseURL}/admin/approve/${participantID}`;
    try {
      const response = await fetch(apiURL, { method: "PATCH" });
      if (response.status == 200) {
        fetchParticipants();
        alert("Participant approved successfully");
      }
    } catch (error) {
      console.error("Error accepting participants:", error);
    }
  };
  // Function to handle approve of participant
  const handleDecline = async (participantID) => {
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiURL = `${apiBaseURL}/admin/decline/${participantID}`;
    try {
      const response = await fetch(apiURL, { method: "PATCH" });
      if (response.status == 200) {
        fetchParticipants();
        alert("Participant declined successfully");
      }
    } catch (error) {
      console.error("Error declining participants:", error);
    }
  };

  useEffect(() => {
    handleSearchFilter();
  }, [selectedStatus]);

  const handleSearch = (val) => {
    setFilterParticipants(
      participants.filter(
        (participant) =>
          participant.firstName.toLowerCase().includes(val.toLowerCase()) ||
          participant.lastName.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 ">
        <h1 className="text-3xl font-semibold font-mont text-white">Testing</h1>
        <div className="flex gap-6">
          {isStart && (
            <button className="yellow_btn" onClick={handleStart}>
              Start Competition
            </button>
          )}
          {isEnd && (
            <button className="outline_btn" onClick={handleEnd}>
              End Competition
            </button>
          )}
        </div>
      </div>

      <StatsCard />

      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold font-mont text-white">Entries</h1>

        <form action="" className="flex gap-3">
          <Input
            placeholder="Search"
            value={search}
            className="border border-gray-200 rounded-[4px] text-white"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch(e.target.value);
              }
            }}
          />
          <Select onValueChange={(value) => handleStatusSelect(value)}>
            <SelectTrigger className="border border-gray-200 rounded-[4px] text-white">
              <SelectValue placeholder={selectedStatus || "All"} />
            </SelectTrigger>
            <SelectContent className="bg-slate-100">
              <SelectGroup>
                {statusOptions.map((status, i) => (
                  <SelectItem key={i} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
      </div>

      <TableData
        participants={filterParticipants}
        handleApprove={handleApprove}
        handleDecline={handleDecline}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  if (!token) {
    // If no token, redirect to login
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const validationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/validate-token`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!validationResponse.ok) {
    // If token validation fails, redirect to login
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If token is valid, render the page
  return { props: {} }; // Pass props as needed
}
