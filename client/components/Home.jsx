"use client";

import React from "react";
import { useState } from "react";
import StatsCard from "./StatsCard";
import TableData from "./TableData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { info } from "autoprefixer";

const status = ["All", "pending", "successful", "decline"];

const Dashboard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleStatusSelect = (event) => {
    setSelectedValue(event);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4 ">
        <h1 className="text-3xl font-semibold font-mont text-white">Testing</h1>
        <button className="yellow_btn">End Competition</button>
      </div>

      <StatsCard />

      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold font-mont text-white">Entries</h1>

        <form action="" className="flex gap-3">
          <Input placeholder="Search" className="search" />
          <Select onValueChange={(event) => handleStatusSelect(event)}>
            <SelectTrigger className="search">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-100">
              <SelectGroup>
                {status.map((index, i) => (
                  <SelectItem key={i} value={index}>
                    {index}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
      </div>

      <TableData />
    </div>
  );
};

export default Dashboard;
