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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const apiURL = `${apiBaseURL}/admin/login`;

    try {
      const response = await axios.post(apiURL, { login, password });
      setResponseLog(`Response received: ${JSON.stringify(response.data)}`);
      console.log("Login Successful");
    } catch (error) {
      console.log("Login Failed");
    }
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
          <CardTitle className="head_text w-auto sm:w-[484px]">Login</CardTitle>
          <CardDescription className="head_para">
            Enter password to login into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="label">
                  Email/Username
                </Label>
                <Input
                  name="email"
                  placeholder="Enter email"
                  className="input "
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="label">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="input "
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="yellow_btn w-full mt-4">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
