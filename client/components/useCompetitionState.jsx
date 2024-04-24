"use client";
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
        console.log("Competition State:", competitionState);
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
