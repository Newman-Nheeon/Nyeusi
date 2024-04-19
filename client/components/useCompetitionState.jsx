"use client";
import Register from "@/app/complete-registration/page";
import Home from "@/app/page";
import Vote from "@/app/vote/page";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const useCompetitionState = () => {
  const [competitionState, setCompetitionState] = useState("");

  useEffect(() => {
    const fetchCompetitionState = async () => {
      const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const stateAPI = `${apiBaseURL}/admin/competition-state`;
      try {
        const response = await axios.get(stateAPI);
        setCompetitionState(response.data.state);
      } catch (error) {
        console.error("Error fetching competition state:", error);
      }
    };

    fetchCompetitionState();
  }, []);

  //

  return competitionState;
};

export default useCompetitionState;
