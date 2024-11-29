"use client";

import { useEffect, useState } from "react";
import EmailRegistration from "@/components/submit-email";

const Home = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    email: "",
  });

  useEffect(() => {
    // Dynamically add the CookieYes script
    const script = document.createElement("script");
    script.id = "cookieyes";
    script.type = "text/javascript";
    script.src = "https://cdn-cookieyes.com/client_data/1d49d24a351c1ae4e422796e/script.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <EmailRegistration />
    </div>
  );
};

export default Home;
