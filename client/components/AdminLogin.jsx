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
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="label">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  className="input "
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
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="yellow_btn w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
