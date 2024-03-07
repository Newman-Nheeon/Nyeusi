"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import VerifyEmail from "./VerifyEmail";

const EmailRegistration = ({ type, post, setPost, submitting }) => {
  const [emailValid, setEmailValid] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
  });

  const handleSubmit = () => {
    let emails = {
      email: formValues.email,
    };
    setShowConfirmation(true);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const isValid = validateEmail(emailValue);
    setEmailValid(isValid || emailValue === true); // Set emailValid to true if emailValue is empty
    setFormValues({
      ...formValues,
      email: emailValue,
    });
  };

  return (
    <div
      className="p-[12px] rounded-xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(14px)",
      }}
    >
      {!showConfirmation ? (
        <Card className="w-auto bg-white  rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl-semibold tracking-wide mb-[8px]">
              Join Nyeusi Music Competition
            </CardTitle>
            <CardDescription className="text-base tracking-wide">
              Begin your journey by entering your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-base font-inter">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="input"
                    value={formValues.email}
                    onChange={handleEmailChange}
                  />
                  {!emailValid && formValues.email !== "" && (
                    <span className="text-xs text-red-500">
                      Please provide a valid email
                    </span>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              className="yellow_btn w-full"
              onClick={handleSubmit}
              disabled={!emailValid || !formValues.email}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <VerifyEmail />
      )}
    </div>
  );
};

export default EmailRegistration;
