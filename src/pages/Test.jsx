import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

const data = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 9, name: "Charlie Brown", email: "charlie@example.com" },
];

const Test = () => {
  const [pageSize, setPageSize] = useState(10); // Default rows per page
  useEffect(()=>{
    console.log("log:", pageSize)
  },[pageSize])
  return (
    <div className="container mx-auto p-5 rounded-xl bg-white">
      <h1 className="text-2xl font-bold mb-4">ShadCN Data Table in JSX</h1>
      <input onChange={(e)=>setPageSize(e.target.value)} type="number" className="border border-neutral-500 mb-4 rounded-md"/>
      <DataTable columns={columns} data={data} pageSize = {pageSize} />
    </div>
  );
};

export default Test;
