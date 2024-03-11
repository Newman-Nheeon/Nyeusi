"use client";

import { useState } from "react";

import axios from "axios";

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
    label: "First Name",
    placeholder: "Enter your full name",
    id: "firstName",
  },
  {
    label: "Last Name",
    placeholder: "Enter your full name",
    id: "lastName",
  },
  {
    label: "Stage Name",
    placeholder: "Enter your stage name",
    id: "stageName",
  },
  {
    label: "Social Media Handle",
    placeholder: "Enter your social media handle",
    id: "socialMediaHandle",
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
    firstName: "",
    lastName: "",
    stageName: "",
    socialMediaHandle: "",
    socialMediaPlatform: "",
    profileImage: "",
    comment: "",
    termsAccepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [requestLog, setRequestLog] = useState("");
  const [responseLog, setResponseLog] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let fields = {
  //     ...formValues,
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your validation logic...
    const isValid = validateForm(formValues);
    setRequestLog(`Submitting data: ${JSON.stringify(formValues)}`);
    setFormValidation(isValid);

    if (isValid) {
      try {
        // Call your API to submit the form data using Axios
        const response = await axios.post("/complete-registration", formValues);
        setResponseLog(`Response received: ${JSON.stringify(response.data)}`);
        setSubmitted(true); // Set submitted state to true
        setShowConfirmation(true); // Show confirmation dialogue
      } catch (error) {
        const errorMessage = error.response
          ? JSON.stringify(error.response.data)
          : error.message;
        setErrorLog(errorMessage);
        console.error("Error submitting form:", error);
      }
    }
  };

  const validateForm = (values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!emailRegex.test(values.email)) {
      isValid = false;
      console.log("Invalid email:", values.email);
    }
    if (values.firstName.trim() === "") {
      isValid = false;
      console.log("First name is empty");
    }
    if (values.lastName.trim() === "") {
      isValid = false;
      console.log("Last name is empty");
    }
    if (values.stageName.trim() === "") {
      isValid = false;
      console.log("Stage name is empty");
    }
    if (values.socialMediaHandle.trim() === "") {
      isValid = false;
      console.log("Social handle is empty");
    }
    if (!values.socialMediaPlatform) {
      isValid = false;
      console.log("Social media is not picked");
    }
    if (!values.profileImage) {
      isValid = false;
      console.log("upload image");
    }
    if (values.comment.trim() === "") {
      isValid = false;
      console.log("Comment is empty");
    }
    if (!values.termsAccepted) {
      isValid = false;
      console.log("Terms Not accepted");
    }

    return isValid;
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

  const handleSocialMediaSelect = (selectedValue) => {
    console.log("Selected social media:", selectedValue);
    setFormValues((prevState) => ({
      ...prevState,
      socialMediaPlatform: selectedValue,
    }));
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

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="socialMediaPlatform" className="label">
                    Select Social Media Handle
                  </Label>

                  <select
                    onChange={(e) => handleSocialMediaSelect(e.target.value)}
                  >
                    <option value={""}>Select Social Media</option>
                    {socialMediaOptions.map((social, i) => (
                      <option key={i} value={social.label}>
                        {social.label}
                      </option>
                    ))}
                  </select>
                  {/* <Select>
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
                            value={social.label}
                            onClick={() =>
                              handleSocialMediaSelect(social.label)
                            }
                          >
                            {social.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select> */}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="picture" className="label">
                    Upload Picture
                  </Label>
                  <Input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*" // Limit file selection to images
                    className="input"
                    // value={formValues.profileImage}
                    onChange={handleChange}
                  />
                </div>

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
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    className="text-slate-400 rounded-[4px] border-slate-300"
                    checked={formValues.termsAccepted}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="termsAccepted"
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
