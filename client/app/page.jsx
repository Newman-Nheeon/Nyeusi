"use client";

import { useState } from "react";
import EmailRegistration from "@/components/submit-email";

const Home = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    email: "",
  });

  return (
    <EmailRegistration/>
  );
};

export default Home;
