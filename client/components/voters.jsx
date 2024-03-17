"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const socialMediaOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
];

const VotersHandle = ({ handleClose }) => {
  const [formValidation, setFormValidation] = useState(false);
  const [formValues, setFormValues] = useState({
    socialMediaHandle: "",
    socialMediaPlatform: "",
  });
  const [selectedValue, setSelectedValue] = useState("");

  const validateForm = (values) => {
    let isValid = true;

    if (values.socialMediaHandle.trim() === "") {
      isValid = false;
      console.log("Social handle is empty");
    }
    if (!selectedValue) {
      isValid = false;
      console.log("Social media is not picked");
    }
    return isValid;
  };

  const handleVote = () => {
    const isValid = validateForm(formValues);
    if (!isValid) {
      console.error("Form validation failed");
      return; // Stop the form submission if validation fails
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const closeHandle = () => {
    handleClose();
  };

  const handleSocialMediaSelect = (event) => {
    setSelectedValue(event);
    setFormValues((prevState) => ({
      ...prevState,
      socialMediaPlatform: event,
    }));
  };
  return (
    <div
      className="p-[12px] rounded-xl shadow-2xl"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Card className="card">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="head_text w-auto sm:w-[484px]">
              Vote Participants
            </CardTitle>
            <img
              src="/assets/icons/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={closeHandle}
            />
          </div>
          <CardDescription className="head_para">
            Enter your preferred social Handle to vote your favorite.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="socialMediaPlatform" className="label">
                  Social Media Platform
                </Label>
                <Select
                  onValueChange={(event) => handleSocialMediaSelect(event)}
                >
                  <SelectTrigger className=" input">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectGroup>
                      <SelectLabel>Social Handle</SelectLabel>

                      {socialMediaOptions.map((social, i) => (
                        <SelectItem key={i} value={social.label}>
                          {social.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="label">
                  Social Media Handle
                </Label>
                <Input
                  id="socialMediaHandle"
                  name="socialMediaHandle"
                  placeholder="Enter your social media handle"
                  className="input "
                  value={formValues.socialMediaHandle}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="submit"
            className="yellow_btn w-full"
            onClick={handleVote}
          >
            Vote
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VotersHandle;
