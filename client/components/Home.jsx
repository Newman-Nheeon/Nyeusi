"use client";
import React, { useState, useEffect } from "react";
import StatsCard from "./StatsCard";
import TableData from "./TableData";
import { Input } from "@/components/ui/input";
import axiosInstance from "../axiosInstance";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import useCompetitionState from "./useCompetitionState";

const statusOptions = ["All", "pending", "approved", "declined"];

export default function Dashboard() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [isStart, setStart] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const competitionState = useCompetitionState();

  // Function to fetch participants and reset filters
  const fetchParticipants = async () => {
    try {
      const response = await axiosInstance.get(`/total-participant`);
      setParticipants(response.data.participants);
      setFilteredParticipants(response.data.participants);
      setSelectedStatus("All"); // Reset the selected status to "All"
      setSearch(""); // Clear the search term
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleStatusSelect = (value) => {
    setSelectedStatus(value.toLowerCase());
    filterParticipants(value.toLowerCase(), search);
  };

  const filterParticipants = (status, searchTerm) => {
    let filtered = [...participants];
    
    // Filter by status if not "All"
    if (status !== "all") {
      filtered = filtered.filter((participant) => participant.status.toLowerCase() === status);
    }

    // Apply search filter if searchTerm is not empty
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((participant) => {
        const firstName = participant.firstName?.toLowerCase() || "";
        const lastName = participant.lastName?.toLowerCase() || "";
        const stageName = participant.stageName?.toLowerCase() || "";
        const socialMediaHandle = participant.socialMediaHandle?.toLowerCase() || "";
        const email = participant.email?.toLowerCase() || "";

        return (
          firstName.includes(lowerSearch) ||
          lastName.includes(lowerSearch) ||
          stageName.includes(lowerSearch) ||
          socialMediaHandle.includes(lowerSearch) ||
          email.includes(lowerSearch)
        );
      });
    }

    setFilteredParticipants(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterParticipants(selectedStatus, value);
  };

  const handleApprove = async (participantID) => {
    try {
      const response = await axiosInstance.patch(`/admin/approve/${participantID}`);
      if (response.status === 200) {
        alert("Participant approved successfully");
        fetchParticipants(); // Re-fetch all participants to update the list
      }
    } catch (error) {
      console.error("Error approving participant:", error);
    }
  };

  const handleDecline = async (participantID) => {
    try {
      const response = await axiosInstance.patch(`/admin/decline/${participantID}`);
      if (response.status === 200) {
        alert("Participant declined successfully");
        fetchParticipants(); // Re-fetch all participants to update the list
      }
    } catch (error) {
      console.error("Error declining participant:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 ">
        <h1 className="text-3xl font-semibold font-mont text-white">Testing</h1>
        <div className="flex gap-6">
          {isStart && (
            <button className="yellow_btn">
              Start Competition
            </button>
          )}
          {isEnd && (
            <button className="outline_btn">
              End Competition
            </button>
          )}
        </div>
      </div>

      <StatsCard />

      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold font-mont text-white">Entries</h1>

        <form className="flex gap-3">
          <Input
            placeholder="Search"
            value={search}
            className="border border-gray-200 rounded-[4px] text-white"
            onChange={handleSearchChange}
          />
          <Select onValueChange={handleStatusSelect}>
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
        participants={filteredParticipants}
        handleApprove={handleApprove}
        handleDecline={handleDecline}
      />
    </div>
  );
}
