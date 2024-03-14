"use client";

import { Card, CardHeader } from "@/components/ui/card";

const Verification = () => {
  return (
    <div
      className="outer_card"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(14px)",
      }}
    >
      <Card className="card flex-col items-center justify-center p-12">
        <CardHeader className="flex-col items-center justify-center gap-3">
          <img
            src="/assets/images/checked.png"
            alt="menu"
            width={120}
            height={120}
          />
          <cardTitle className="text-lg font-mont pt-4 text-center lg:w-[409px]">
            Your account has been verified successfully.
          </cardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Verification;
