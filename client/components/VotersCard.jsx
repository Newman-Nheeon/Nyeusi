"use client";

import React from "react";
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

const socialHandles = [
  { name: "facebook", svg: "facebook.svg" },
  { name: "instagram", svg: "instagram.svg" },
  { name: "tiktok", svg: "tiktok.svg" },
];

const cards = [
  {
    image: "image1.jpg",
    musicName: "Melody Masters",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "38",
  },
  {
    image: "image2.jpg",
    musicName: "Harmonic Showcase",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "38",
  },
  {
    image: "image3.jpg",
    musicName: "Rhythm Rivalry",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "38",
  },
  {
    image: "image4.jpg",
    musicName: "Songbird Showdown",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "38",
  },
  {
    image: "image5.jpg",
    musicName: "Crescendo Challenge",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "38",
  },
  {
    image: "image6.jpg",
    musicName: "Tune Triumph",
    message:
      "Lorem ipsum dolor sit amet id in ac in consectetur. Imperdiet facilisis id in ac enim pulvinar aenean.",
    votes: "38",
  },
];

const VotersCard = () => {
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex justify-center flex-wrap gap-6 w-full">
      {cards.map((card, i) => (
        <Card className="bg-white sm:w-auto w-3/4 rounded-xl flex-col gap-4">
          <CardHeader key={i} className="px-0 pt-0 pb-0">
            <Image
              src={`/assets/images/${card.image}`}
              alt="flower"
              width={235}
              height={175}
              className="object-cover rounded-t-[12px] lg:w-[235px] w-full h-[175px]"
            />
            <CardDescription className="sm:w-[235px] w-full text-base font-medium font-mont px-2 pt-2">
              {card.musicName}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-col justify-between px-2 pt-2 pb-0">
            <p>{card.votes} votes</p>
          </CardContent>

          <CardFooter className="px-2 pt-6 pb-2">
            <Button className="yellow_btn w-full">Vote</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VotersCard;
