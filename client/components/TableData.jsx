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
import { Pointer } from "lucide-react";
import ParticipantInfo from "./ParticipantInfo";

const Headers = [
  "First Name",
  "Last Name",
  "Stage Name",
  "Social Handle",
  "Status",
  "Vote",
  "Action",
];

const infos = [
  {
    firstName: "OyindamolaOyindamolaOyindamolaOyindamola",
    lastName: "Olanrewaju",
    stageName: "oyindamolaaji",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: 100,
    action: "Action 1",
  },
  {
    firstName: "Newman",
    lastName: "Haruna",
    stageName: "NwmanBad guy",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: "0",
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",
    status: "decline",
    voteCount: "0",
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
    voteCount: "0",
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "0",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: "100",
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: "0",
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "0",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: "100",
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: "0",
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "0",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: "30",
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: "0",
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "0",
    action: "Action",
  },
  {
    firstName: "John",
    lastName: "Doe",
    stageName: "JD",
    socialHandle: "@johndoe",
    icon: "tick-circle.svg",
    status: " successful",
    voteCount: "100",
    action: "Action 1",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    stageName: "JS",
    socialHandle: "@janesmith",
    icon: "danger.svg ",
    status: "pending",
    voteCount: "0",
    action: "Action 2",
  },
  {
    firstName: "Mike",
    lastName: "Johnson",
    stageName: "Johnny",
    socialHandle: "johnnythebadguy",
    icon: "close-circle.svg",

    status: "decline",
    voteCount: "0",
    action: "Action",
  },
];

const TableData = () => {
  const itemsPerPage = 10;
  const [showParticipant, setParticipants] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = infos.slice(indexofFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => {
    setParticipants(false);
  };

  const handleParticipant = () => {
    setParticipants(true);
  };

  return (
    <div>
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
              <TableCell>
                <p className="truncate w-[120px]">{info.firstName}</p>
              </TableCell>
              <TableCell>
                <p className="truncate w-[120px]">{info.lastName}</p>
              </TableCell>
              <TableCell>
                <p className="truncate w-[120px]">{info.stageName}</p>
              </TableCell>
              <TableCell>
                <p className="truncate w-[120px]">{info.socialHandle}</p>
              </TableCell>

              <TableCell>
                <p className="truncate w-[120px] flex gap-2 items-center">
                  <img src={`/assets/icons/${info.icon}`} alt={info.status} />
                  {info.status}
                </p>
              </TableCell>
              <TableCell>
                <p className="truncate w-[120px]">{info.voteCount}</p>
              </TableCell>
              <TableCell>
                <img
                  src={`/assets/icons/export.svg`}
                  alt={"export"}
                  className="input"
                  onClick={() => handleParticipant()}
                />
              </TableCell>
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
              style={{ cursor: "pointer" }}
              onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
            />
          </PaginationItem>

          {[...Array(Math.ceil(infos.length / itemsPerPage)).keys()].map(
            (number, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  style={{ cursor: "pointer" }}
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
              style={{ cursor: "pointer" }}
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

      {showParticipant && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <ParticipantInfo handleClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default TableData;
