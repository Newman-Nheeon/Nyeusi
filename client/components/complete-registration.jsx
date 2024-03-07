"use client";

import { useState } from "react";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import VerifyEmail from "./VerifyEmail";
import Successful from "./Successful";

const fields = [
  {
    label: "Email",
    placeholder: "Enter your email address",
    id: "email",
  },
  {
    label: "Full Name",
    placeholder: "Enter your full name",
    id: "fullName",
  },
  {
    label: "Stage Name",
    placeholder: "Enter your stage name",
    id: "stageName",
  },
  {
    label: "Social Media Handle",
    placeholder: "Enter your social media handle",
    id: "socialHandle",
  },
];

const socialMediaOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
];

const completeRegistration = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValidation, setFormValidation] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    fullName: "",
    stageName: "",
    socialHandle: "",
    comment: "",
    terms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let fields = {
      ...formValues,
    };

    const isValid = validateForm(fields);
    setFormValidation(isValid);
    if (isValid) {
      submitForm(fields);
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }

    setSubmitted(true);
  };

  const validateForm = (values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!emailRegex.test(values.email)) {
      isValid = false;
      console.log("Invalid email:", values.email);
    }
    if (values.fullName.trim() === "") {
      isValid = false;
      console.log("Full name is empty");
    }
    if (values.stageName.trim() === "") {
      isValid = false;
      console.log("Stage name is empty");
    }
    if (values.socialHandle.trim() === "") {
      isValid = false;
      console.log("Social handle is empty");
    }
    // if (!values.selectedSocialMedia) {
    //   isValid = false;
    //   console.log("Social handle is not picked");
    // }
    if (values.comment.trim() === "") {
      isValid = false;
      console.log("Comment is empty");
    }
    if (!values.terms) {
      isValid = false;
      console.log("Terms Not accepted");
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  // const handleSocialMediaSelect = (selectedValue) => {
  //   console.log("Selected social media:", selectedValue);
  //   setFormValues((prevState) => ({
  //     ...prevState,
  //     selectedSocialMedia: selectedValue,
  //   }));
  //   // Update socialMediaSelected state based on whether a social media handle is selected
  //   setSocialMediaSelected(!!selectedValue);
  //   console.log("socialMediaSelected:", !!selectedValue);
  // };

  const submitForm = (formData) => {
    // This is a placeholder function for handling form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="outer_card"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(14px)",
      }}
    >
      {!showConfirmation ? (
        <Card className="card">
          <CardHeader>
            <CardTitle className="head_text w-auto sm:w-[484px]">
              Join Nyeusi Music Competition
            </CardTitle>
            <CardDescription className="head_para">
              Begin your journey by entering your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {fields.map((field, index) => (
                  <div key={index} className="flex flex-col space-y-1.5">
                    <Label htmlFor={field.id} className="label">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      className="input "
                      value={formValues[field.label]}
                      helperText={
                        formValidation[field.id]
                          ? ""
                          : `Please provide a valid ${field.label.toLowerCase()}`
                      }
                      onChange={handleChange}
                    />
                    {submitted &&
                      !formValidation[field.id] &&
                      formValues[field.id] === "" && (
                        <span className="text-xs text-red-500">
                          Please provide a valid {field.label.toLowerCase()}
                        </span>
                      )}
                  </div>
                ))}

                {/* Testing select */}
                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="socialmedia" className="label">
                    Select Social Media Handle
                  </Label>

                  <Select>
                    <SelectTrigger className="w-full text-sm text-slate-400 rounded-[6px] border-slate-300 font-sans">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className=" bg-white">
                      <SelectGroup>
                        <SelectLabel className="label">
                          Social Media
                        </SelectLabel>
                        {socialMediaOptions.map((social) => (
                          <SelectItem
                            key={social.value}
                            value={social.value}
                            onClick={() =>
                              handleSocialMediaSelect(social.value)
                            }
                          >
                            {social.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}

                {/* Select part */}
                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="socialmedia" className="label">
                    Select Social Media Handle
                  </Label>

                  <Select>
                    <SelectTrigger className="w-full text-sm text-slate-400 rounded-[6px] border-slate-300 font-sans">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className=" bg-white">
                      <SelectGroup>
                        <SelectLabel className="label">
                          Social Media
                        </SelectLabel>
                        {socials.map((social) => (
                          <SelectItem
                            key={social.id}
                            value={social.label}
                            onClick={() => handleSocialMediaSelect}
                          >
                            {social.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {!validity.socialMedia && (
                    <span className="text-xs text-red-500">
                      Please select a social media handle
                    </span>
                  )}
                </div> */}

                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message" className="label">
                    Comment
                  </Label>
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                    className="input"
                    name="comment"
                    value={formValues.comment}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  {/* <Checkbox
                  id="terms"
                  className="text-slate-400 rounded-[4px] border-slate-300"
                  name="terms"
                  checked={formValues.terms}
                  onChange={handleChange}
                /> */}
                  <input
                    type="checkbox"
                    name="terms"
                    className="text-slate-400 rounded-[4px] border-slate-300"
                    checked={formValues.terms}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </div>
              {/* <Button type="submit" className="yellow_btn w-full">
              Continue
            </Button> */}
            </form>
          </CardContent>
          <CardFooter className="flex-col justify-between">
            <Button
              type="submit"
              className="yellow_btn w-full"
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Successful />
      )}
    </div>
  );
};

export default completeRegistration;