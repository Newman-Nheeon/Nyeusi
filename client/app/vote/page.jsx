"use client";

import { useEffect } from "react";
import VoteCard from "@/components/VoteCard";

const Vote = () => {
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
    <div className="">
      <VoteCard />
    </div>
  );
};

export default Vote;
