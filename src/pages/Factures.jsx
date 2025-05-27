import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/Loading";
import DataTable from "../components/DataTable";
import { Button } from "../components/ui/button";
import { ArrowUpDown, MoreHorizontal, Eye, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function Factures() {
  const [isLoading, setIsLoading] = useState(false);
  const [factures, setFactures] = useState([]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchfactures() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/factures`,
        { headers }
      );
      const transformedData = response.data.map((invoice, index) => ({
        id: index + 1,
        reference: invoice.contratId || 'N/A',
        date: invoice.dateCreation || 'N/A',
        contract: invoice.contract || 'N/A',
        amount: invoice.montantAPayer || 0,
        createdBy: invoice.createdBy || 'N/A',
      }));
      setFactures(transformedData);
      console.log("Fetched data: ", response.data);
      console.log("Transformed data: ", transformedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchfactures();
  }, []);

  const handleView = (id) => {
    alert(`Viewing invoice #${id}`);
    // Add logic to view invoice details
  };

  const handleDelete = (id) => {
    alert(`Deleting invoice #${id}`);
    // Add logic to delete the invoice
  };

  const columns = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          # <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "reference",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Réf. <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "contract",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contrat <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Montant <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{row.getValue('amount')} MAD</span>
      ),
    },
    {
      accessorKey: "createdBy",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Crée par <ArrowUpDown />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleView(row.original.id)}>
              <Eye className="h-4 w-4 mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              <Trash className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading className="animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">#Factures</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <DataTable columns={columns} data={factures} pageSize={10} />
          </div>
        </div>
      )}
    </>
  );
}