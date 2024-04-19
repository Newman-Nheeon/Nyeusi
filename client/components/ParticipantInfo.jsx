import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import axios from "axios";

const socialIcons = [
  {
    instagram: "instagrams.svg",
    tiktok: "tiktoks.svg",
    facebook: "facebooks.svg ",
    entryPost: "link.svg ",
    email: "gmail.svg",
  },
];

const ParticipantInfo = ({
  handleClose,
  selectedParticipant,
  handleApprove,
  handleDecline,
}) => {
  // const handleApprove = async (participantID) => {
  //   const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  //   const apiURL = `${apiBaseURL}/admin/approve/${participantID}`;
  //   try {
  //     const response = await fetch(apiURL, { method: "PATCH" });
  //   } catch (error) {
  //     console.error("Error accepting participants:", error);
  //   }
  // };

  return (
    <div>
      <Card className="card">
        <CardHeader className="bg-yellow-200 rounded-t-xl mb-4">
          <div className="flex justify-between ">
            <CardTitle className="font-lg text-slate-900 font-mont w-auto sm:w-[484px]">
              Participant Details
            </CardTitle>
            <img
              src="/assets/icons/close.svg"
              alt="menu"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          <div className="mb-2">
            <img
              src={`http://localhost:8080/${selectedParticipant?.profileImage}`}
              alt="image"
              className="inline-block h-28 w-28 rounded-full ring-2 ring-white object-cover"
            />
          </div>
          <div className="mb-4">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-semibold font-mont pb-2">
                {selectedParticipant?.firstName +
                  " " +
                  selectedParticipant?.lastName}
              </h1>
              <p className="text-lg font-mont pb-4">
                {selectedParticipant?.stageName}
              </p>

              <div className="flex gap-4 flex-wrap justify-center pb-4 w-[500px] ">
                <p className="flex items-center gap-2 text-sm font-mont px-2 py-2 bg-slate-100 rounded-[4px]">
                  {socialIcons.map((icon) => (
                    <img
                      src={`/assets/icons/${icon.email}`}
                      alt={selectedParticipant?.email}
                    />
                  ))}
                  {selectedParticipant?.email}
                </p>
                <p className="flex items-center gap-2 text-sm font-mont px-2 py-2 bg-slate-100 rounded-[4px]">
                  {socialIcons.map((icon) => (
                    <img
                      src={`/assets/icons/${
                        icon[selectedParticipant?.socialMediaPlatform]
                      }`}
                      alt={selectedParticipant?.socialMediaPlatform}
                    />
                  ))}
                  {selectedParticipant?.socialMediaHandle}
                </p>
                <a
                  href={selectedParticipant?.entrySocialPost}
                  className="flex items-center gap-2 text-sm underline font-mont px-2 py-2 bg-slate-100 rounded-[4px]"
                >
                  {socialIcons.map((icon) => (
                    <img
                      src={`/assets/icons/${icon.entryPost}`}
                      alt={selectedParticipant?.entrySocialPost}
                    />
                  ))}
                  {selectedParticipant?.stageName}
                </a>
              </div>

              <div className="flex gap-4">
                <div className="w-[280px] h-[150px] mb-4 ">
                  {/* <h6 className="text-sm text-center font-semibold font-mont text-slate-900 pb-3">
                  Entry Image
                </h6> */}
                  <img
                    src={`http://localhost:8080/${selectedParticipant?.entryImage}`}
                    alt={selectedParticipant?.entryImage}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-[280px] h-[150px] flex flex-col gap-2 items-center px-4 py-4 bg-slate-100 rounded-[4px]">
                  <h6 className="text-sm text-center font-semibold font-mont text-slate-900">
                    Comment
                  </h6>
                  <p className="text-sm h-full text-center font-mont text-slate-900 w-full">
                    {selectedParticipant?.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="rounded-[8px] border bg-green-600 py-3 px-8 text-white transition-all hover:bg-white hover:text-black text-base cursor-pointer font-mont"
              onClick={() => {
                handleApprove(selectedParticipant?._id);
                handleClose();
              }}
            >
              Approve
            </button>
            <button
              className="rounded-[8px] bg-red-700 py-3 px-8 text-white transition-all hover:bg-white hover:text-black text-base cursor-pointer font-mont"
              onClick={() => {
                handleDecline(selectedParticipant?._id);
                handleClose();
              }}
            >
              Decline
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantInfo;
