"use client";
import cookie from 'cookie';
import React from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
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

export default function Dashboard(){
  
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleStatusSelect = (event) => {
    setSelectedStatus(event);
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


export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  if (!token) {
      // If no token, redirect to login
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          },
      };
  }

  const validationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/validate-token`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });

  if (!validationResponse.ok) {
      // If token validation fails, redirect to login
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          },
      };
  }

  // If token is valid, render the page
  return { props: {} }; // Pass props as needed
}

