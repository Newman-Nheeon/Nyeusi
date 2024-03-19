import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

const Headers = [
  "First Name",
  "Last Name",
  "Stage Name",
  "Social Handle",
  "Status",
  "Vote Count",
  "Action",
];

const TableData = () => {
  return (
    <div classname="text-white">
      <Table>
        <TableHeader classname="flex">
          <TableRow classname="text-white">
            {Headers.map((header, i) => (
              <TableHead key={i} classname="text-3xl">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default TableData;
