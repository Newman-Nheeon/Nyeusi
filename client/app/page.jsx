"use client";

import { useState } from "react";
import EmailRegistration from "@/components/EmailRegistration";
import axios from "axios";

const Home = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    email: "",
  });

  // Function to make API call to submit email
  const CreatePrompt = async () => {
    try {
      // Show alert with input details
      alert(`Email: ${post.email}`);

      setSubmitting(true); // Set submitting to true while waiting for response
      const response = await axios.post("/submit-email", post); // Make POST request to submit email
      console.log(response.data); // Log response data
    } catch (error) {
      console.error("Error submitting email:", error); // Log error if any
    } finally {
      setSubmitting(false); // Reset submitting to false regardless of success or failure
    }
  };

  return (
    <EmailRegistration
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={CreatePrompt}
    />
  );
};

export default Home;
