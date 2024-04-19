"use client";
import cookie from "cookie";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "./StatsCard";
import TableData from "./TableData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

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

const statusOptions = ["All", "pending", "approved", "declined"];
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// How to use the Search & Filter API
// const searchAPI =  `${baseURL}/admin/search?term=${searchTerm}`;
// const filter =  `${baseURL}/admin/total-participant?status=${status}`;

export default function Dashboard() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

  const handleStatusSelect = (event) => {
    setSelectedStatus(event);
  };

  const handleSearchFilter = async () => {
    const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const searchAPI = `${apiBaseURL}/admin/search?term=${search}`;
    const filterAPI = `${apiBaseURL}/admin/total-participant?status=${selectedStatus}`;

    try {
      const [searchResponse, filterResponse] = await Promise.all([
        axios.get(searchAPI),
        axios.get(filterAPI),
      ]);

      setSearchResults(searchResponse.data.search);
      setFilterResults(filterResponse.data.participants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleSearchFilter();
  }, [search, selectedStatus]);

  const handleSearch = () => {};

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
          <Input
            placeholder="Search"
            value={search}
            className="border border-gray-200 rounded-[4px] text-white"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <Select onValueChange={(event) => handleStatusSelect(event)}>
            <SelectTrigger className="border border-gray-200 rounded-[4px] text-white">
              <SelectValue placeholder={selectedStatus || "All"} />
            </SelectTrigger>
            <SelectContent className="bg-slate-100">
              <SelectGroup>
                {statusOptions.map((status, i) => (
                  <SelectItem key={i} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
      </div>

      <TableData searchResults={searchResults} filterResults={filterResults} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  if (!token) {
    // If no token, redirect to login
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const validationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/validate-token`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!validationResponse.ok) {
    // If token validation fails, redirect to login
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If token is valid, render the page
  return { props: {} }; // Pass props as needed
}
