"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { set } from "react-hook-form";
import VotersHandle from "./voters";

const cards = [
  {
    image: "image1.jpg",
    musicName: "Melody Masters",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "0",
  },
  {
    image: "image2.jpg",
    musicName: "Harmonic Showcase",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "0",
  },
  {
    image: "image3.jpg",
    musicName: "Rhythm Rivalry",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "0",
  },
  {
    image: "image4.jpg",
    musicName: "Songbird Showdown",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "0",
  },
  {
    image: "image5.jpg",
    musicName: "Crescendo Challenge",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "0",
  },
  {
    image: "image6.jpg",
    musicName: "Tune Triumph",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "0",
  },
];

const VoteCard = () => {
  const [showHandle, setShowHandle] = useState(false);
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [requestLog, setRequestLog] = useState("");
  const [responseLog, setResponseLog] = useState("");
  const [errorLog, setErrorLog] = useState("");

  const handleVote = () => {
    setShowHandle(true);
  };

  const handleClose = () => {
    setShowHandle(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const apiURL = `${apiBaseURL}/participant`;

      try {
        const response = await axios.get(apiURL);
        setResponseLog(`Participants data: ${JSON.stringify(response.data)}`);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = error.response
          ? JSON.stringify(error.response.data)
          : error.message;
        setErrorLog(errorMessage);
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      {isloading ? (
        <p className="text-white">Loading.....</p>
      ) : errorLog ? (
        <p className="text-red-600">Error: {errorLog}.....</p>
      ) : (
        <div className="flex justify-center flex-wrap gap-6 w-full">
          {data.map((participant, i) => (
            <Card
              className="bg-white sm:w-auto w-3/4 rounded-xl flex-col gap-4"
              key={i}
            >
              {/* Your card content */}
              <CardHeader className="px-0 pt-0 pb-0" key={i}>
                <img
                  src={`http://localhost:8080/uploads/${participant.entryImage}`}
                  alt={participant.firstName}
                  width={235}
                  height={175}
                  className="object-cover rounded-t-[12px] lg:w-[235px] w-full h-[175px]"
                />
                <CardDescription className="sm:w-[235px] w-full text-base font-semibold font-mont px-2 pt-2">
                  {participant.stageName}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-col justify-between px-2 pt-0 pb-0">
                <p className="text-sm">{participant.votes} votes</p>
              </CardContent>

              <CardFooter className="px-2 pt-4 pb-2">
                <Button
                  className="yellow_btn w-full"
                  onClick={() => handleVote()}
                >
                  Vote
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {showHandle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <VotersHandle handleClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default VoteCard;
