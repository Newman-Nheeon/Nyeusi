import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import axios from "axios";

const datas = [
  {
    email: "ajiboyeniola@gmail.com",
    firstName: "Eniola",
    lastName: "Ajiboye",
    stageName: "ajiboyeniola",
    socialMediaHandle: "Total Participants",
    socialMediaPlatform: "instagram",
    entryPost: "people.svg",
    comment:
      "As you slow danced, you wondered if the man in the blue senator will ever call back, but it did not matter because you were dancing with the greatest love of your life — Your father.",
  },
];

const socialIcons = [
  {
    instagram: "tick-circle.svg",
    tiktok: "close-circle.svg",
    facebook: "danger.svg ",
    entryPost: "danger.svg ",
    email: "close-circle.svg",
  },
];

const ParticipantInfo = ({ handleClose, onClose }) => {
  const [participants, setParticipants] = useState();

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
        <CardHeader className="bg-yellow-200 rounded-t-xl mb-8">
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
          <div className="mb-4">
            <img
              src="/assets/images/image1.jpg"
              alt="image"
              className="inline-block h-32 w-32 rounded-full ring-2 ring-white object-cover"
            />
          </div>
          <div className="mb-6">
            {datas.map((data, i) => (
              <div key={i} className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold font-mont pb-2">
                  {data.firstName + " " + data.lastName}
                </h1>
                <p className="text-lg font-mont pb-8">{data.stageName}</p>

                <div className="flex gap-4 flex-wrap justify-center pb-6 w-[500px]">
                  <p className="flex items-center gap-2 text-xs font-mont px-2 py-2 bg-slate-100 rounded-[4px]">
                    {socialIcons.map((icon) => (
                      <img
                        src={`/assets/icons/${icon.email}`}
                        alt={data.email}
                      />
                    ))}
                    {data.email}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-mont px-2 py-2 bg-slate-100 rounded-[4px]">
                    {socialIcons.map((icon) => (
                      <img
                        src={`/assets/icons/${icon[data.socialMediaPlatform]}`}
                        alt={data.socialMediaPlatform}
                      />
                    ))}
                    {data.stageName}
                  </p>
                  <p className="flex items-center gap-2 text-xs font-mont px-2 py-2 bg-slate-100 rounded-[4px]">
                    {socialIcons.map((icon) => (
                      <img
                        src={`/assets/icons/${icon.entryPost}`}
                        alt={data.entryPost}
                      />
                    ))}
                    {data.entryPost}
                  </p>
                </div>

                <div className="w-[500px]">
                  <p className="text-sm font-mont text-slate-900 px-4 py-4 bg-slate-100 rounded-[4px]">
                    {data.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              className="rounded-[8px] border bg-green-600 py-3 px-8 text-white transition-all hover:bg-white hover:text-black text-base cursor-pointer font-mont"
              onClick={() => handleApprove()}
            >
              Approve
            </button>
            <button className="rounded-[8px] bg-red-700 py-3 px-8 text-white transition-all hover:bg-white hover:text-black text-base cursor-pointer font-mont">
              Decline
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantInfo;
