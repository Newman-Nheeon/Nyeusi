"use client";

import axios from 'axios';

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
import { useState } from "react";
import VerifyEmail from "./VerifyEmail";


const submitEmail = ({ type, post, setPost, submitting }) => {
  const [emailValid, setEmailValid] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState({email: "" });
  const [requestLog, setRequestLog] = useState('');
  const [responseLog, setResponseLog] = useState('');
  const [errorLog, setErrorLog] = useState('');


  const handleSubmit = async () => {
    if (!emailValid || !formValues.email) return;
  
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiURL = `${apiBaseURL}/submit-email`;
  
    const emailData = { email: formValues.email };
    setRequestLog(`Submitting email: ${JSON.stringify(emailData)}`);
  
    try {
      const response = await axios.post(apiURL, emailData);
      setResponseLog(`Response received: ${JSON.stringify(response.data)}`); 
      console.log("Verification link sent");
      setShowConfirmation(true);
    } catch (error) {
      const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
      setErrorLog(errorMessage); 
      console.error('Error submitting email:', error);
    }
  };
  


  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const isValid = validateEmail(emailValue);
    setEmailValid(isValid || emailValue === true); /
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
          {errorLog && <div className="log error-log">{errorLog}</div>}

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

export default submitEmail;
