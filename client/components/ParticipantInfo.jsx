import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const datas = [
  {
    label: "Email",
    value: "ajiboyeniola.com",
  },
  {
    label: "First Name",
    value: "Ajiboye Eniola",
  },
  {
    label: "Last Name",
    value: "Ajiboye Eniola",
  },
  {
    label: "Stage Name",
    value: "Ajiboye Eniola",
  },
  {
    label: "Social Handle",
    value: "Ajiboye Eniola",
  },
  {
    label: "Social Platform",
    value: "Ajiboye Eniola",
  },
  {
    label: "Entry Post",
    value: "Ajiboye Eniola",
  },
  {
    label: "Comment",
    value: "Ajiboye Eniola",
  },
];

const ParticipantInfo = ({ handleClose, onClose }) => {
  return (
    <div>
      <Card className="card">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="head_text w-auto sm:w-[484px]">
              Participant Information
            </CardTitle>
            <img
              src="/assets/icons/close.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <CardDescription className="head_para">
            Review participant details and make a decision
          </CardDescription>
        </CardHeader>

        {/* <CardContent className="grid grid-cols-2 gap-4 w-[835px]">
          <div>
            <img
              src="/assets/images/image1.jpg"
              alt="image"
              width={205}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 w-auto">
            {datas.map((data, i) => (
              <div>
                <h1>{data.label}</h1>
                <p>{data.value}</p>
              </div>
            ))}
          </div>
        </CardContent> */}

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex justify-center sm:justify-start">
            <img
              src="/assets/images/image1.jpg"
              alt="image"
              className="object-cover w-full max-full"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {datas.map((data, i) => (
              <div key={i}>
                <h1>{data.label}</h1>
                <p>{data.value}</p>
              </div>
            ))}
            <div className="flex gap-4">
              <button className="rounded-[8px] border border-red-700 bg-red-700 py-2 px-5 text-black transition-all hover:bg-white text-center text-sm flex items-center justify-center font-mont cursor-pointer font-mont">
                Decline
              </button>
              <button className="rounded-[8px] border border-green-600 bg-green-600 py-2 px-5 text-black transition-all hover:bg-white text-center text-sm flex items-center justify-center font-mont cursor-pointer font-mont">
                Accept
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantInfo;
