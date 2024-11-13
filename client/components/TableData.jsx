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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ParticipantInfo from "./ParticipantInfo";
import { Checkbox } from "./ui/checkbox";

const Headers = [
  "First Name",
  "Last Name",
  "Stage Name",
  "Social Handle",
  "Status",
  "Vote",
  "Action",
];

const statusIcons = {
  approved: "tick-circle.svg",
  declined: "close-circle.svg",
  pending: "danger.svg",
};

const TableData = ({ participants, handleApprove, handleDecline }) => { 
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [showParticipant, setShowParticipants] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Sort participants by totalVotes in descending order
  const sortedParticipants = [...participants].sort((a, b) => b.totalVotes - a.totalVotes);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedParticipants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => {
    setShowParticipants(false);
  };

  const handleParticipant = (participantData) => {
    setSelectedParticipant(participantData);
    setShowParticipants(true);
  };

  const handleCheckbox = (index) => {
    const selectedData = selectedItems.includes(index)
      ? selectedItems.filter((item) => item !== index)
      : [...selectedItems, index];

    setSelectedItems(selectedData);
  };

  const handleSelectAllCheckboxChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      <Table style={{ marginBottom: "20px" }}>
        <TableHeader>
          <TableRow style={{ color: "white", fontSize: "16px", fontWeight: "400", border: "solid 1px #475569" }}>
            <TableHead>
              <Checkbox checked={selectAll} onChange={handleSelectAllCheckboxChange} />
            </TableHead>
            {Headers.map((header, i) => (
              <TableHead key={i} style={{ color: "#64748A", fontSize: "16px" }}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((info, i) => (
            <TableRow key={i} style={{ color: "white", fontSize: "16px", fontWeight: "400", border: "solid 1px #475569" }}>
              <TableCell>
                <Checkbox checked={selectedItems.includes(i)} onChange={() => handleCheckbox(i)} />
              </TableCell>
              <TableCell><p className="truncate w-[120px]">{info.firstName}</p></TableCell>
              <TableCell><p className="truncate w-[120px]">{info.lastName}</p></TableCell>
              <TableCell><p className="truncate w-[120px]">{info.stageName}</p></TableCell>
              <TableCell><p className="truncate w-[120px]">{info.socialMediaHandle}</p></TableCell>
              <TableCell>
                <p className="truncate w-[120px] flex gap-2 items-center">
                  <img src={`/assets/icons/${statusIcons[info.status]}`} alt={info.status} />
                  {info.status}
                </p>
              </TableCell>
              <TableCell><p className="truncate w-[120px]">{info.totalVotes}</p></TableCell>
              <TableCell>
                <img src={`/assets/icons/export.svg`} alt={"export"} className="input" onClick={() => handleParticipant(info)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        style={{ color: "white" }}
        itemsPerPage={itemsPerPage}
        totalItems={participants.length} 
        currentPage={currentPage}
        paginate={paginate}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious style={{ cursor: "pointer" }} onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)} />
          </PaginationItem>

          {[...Array(Math.ceil(participants.length / itemsPerPage)).keys()].map((number, index) => (
            <PaginationItem key={index}>
              <PaginationLink style={{ cursor: "pointer" }} onClick={() => paginate(number + 1)} isActive={number + 1 === currentPage}>
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              style={{ cursor: "pointer" }}
              onClick={() =>
                paginate(currentPage === Math.ceil(participants.length / itemsPerPage)
                  ? Math.ceil(participants.length / itemsPerPage)
                  : currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {showParticipant && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <ParticipantInfo
            handleClose={handleClose}
            selectedParticipant={selectedParticipant}
            handleApprove={handleApprove}
            handleDecline={handleDecline}
          />
        </div>
      )}
    </div>
  );
};

export default TableData;
