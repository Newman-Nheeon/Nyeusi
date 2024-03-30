"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Headers = [
  "First Name",
  "Last Name",
  "Stage Name",
  "Social Handle",
  "Status",
  "Vote Count",
  "Action",
];

const infos = [
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: 50,
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "390",
    action: "Action",
  },
];

const itemsPerPage = 10;

const TableData = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infos.slice(indexofFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{}}>
      <Table style={{ marginBottom: "20px" }}>
        <TableHeader>
          <TableRow style={{ border: "solid 1px #475569" }}>
            {Headers.map((header, i) => (
              <TableHead key={i} style={{ color: "#64748A", fontSize: "16px" }}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((info, i) => (
            <TableRow
              key={i}
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "400",
                border: "solid 1px #475569",
              }}
            >
              <TableCell>{info.firstName}</TableCell>
              <TableCell>{info.lastName}</TableCell>
              <TableCell>{info.stageName}</TableCell>
              <TableCell>{info.socialHandle}</TableCell>
              <TableCell
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <img src={`/assets/icons/${info.icon}`} alt={info.status} />
                {info.status}
              </TableCell>
              <TableCell>{info.voteCount}</TableCell>
              <TableCell>{info.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        style={{ color: "white" }}
        itemsPerPage={itemsPerPage}
        totalItems={infos.length}
        currentPage={currentPage}
        paginate={paginate}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
            />
          </PaginationItem>

          {[...Array(Math.ceil(infos.length / itemsPerPage)).keys()].map(
            (number, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => paginate(number + 1)}
                  isActive={number + 1 === currentPage}
                >
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                paginate(
                  currentPage === Math.ceil(infos.length / itemsPerPage)
                    ? Math.ceil(infos.length / itemsPerPage)
                    : currentPage + 1
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TableData;
