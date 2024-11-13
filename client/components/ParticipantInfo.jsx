import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ParticipantInfo = ({
  handleClose,
  selectedParticipant,
  handleApprove,
  handleDecline,
}) => {
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
              alt="close"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </CardHeader>

        <CardContent className="flex gap-8">
          <div className="">
            <img
              src={selectedParticipant?.profileImage}
              alt="profile"
              className="inline-block h-28 w-28 ring-2 ring-white object-cover"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <p className="text-base font-semibold">Full Name:</p>
                <p>
                  {selectedParticipant?.firstName +
                    " " +
                    selectedParticipant?.lastName}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-base font-semibold">Stage Name:</p>
                <p>{selectedParticipant?.stageName}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-base font-semibold">Social Media Post:</p>
                <a
                  href={selectedParticipant?.entrySocialPost}
                  className="w-[150px] truncate"
                >
                  {selectedParticipant?.entrySocialPost}
                </a>
              </div>
              <div className="flex gap-2">
                <p className="text-base font-semibold">Social Handle:</p>
                <p>{selectedParticipant?.socialMediaPlatform}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-base font-semibold">Social Media Handle:</p>
                <p>{selectedParticipant?.socialMediaHandle}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-base font-semibold">Comment:</p>
                <p>{selectedParticipant?.comment}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="rounded-[8px] border bg-green-600 py-2 px-8 text-white transition-all text-base cursor-pointer font-mont"
                onClick={() => {
                  handleApprove(selectedParticipant?._id);
                  handleClose();
                }}
              >
                Approve
              </button>
              <button
                className="rounded-[8px] bg-red-700 py-2 px-8 text-white transition-all text-base cursor-pointer font-mont"
                onClick={() => {
                  handleDecline(selectedParticipant?._id);
                  handleClose();
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantInfo;
