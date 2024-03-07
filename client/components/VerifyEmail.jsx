"use client";

import Link from "next/link";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VerifyEmail = () => {
  return (
    <div
      className="p-[12px] rounded-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Card className="card flex-col items-center justify-center">
        <CardContent className="flex-col items-center justify-center gap-3">
          <CardHeader className="flex-col items-center justify-center gap-3">
            <img
              src="/assets/images/checked.png"
              alt="menu"
              width={140}
              height={140}
            />
          </CardHeader>
          <CardDescription className="text-lg font-medium font-mont text-center w-[380px] mb-1">
            We have sent a confirmation link to email
          </CardDescription>
          <CardDescription className="text-sm font-mont text-center w-[370px]">
            Didn't get the mail? {""}
            <Link href="/support" className="text-yellow-500 font-semibold">
              Click to resend Link
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
