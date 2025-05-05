import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/Loading";
import DataTable from "../components/DataTable";
import { Button } from "../components/ui/button";
import { ArrowUpDown, MoreHorizontal, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/users`,
        { headers }
      );
      const transformedData = response.data.map((user, index) => ({
        id: index + 1,
        avatar: user.avatar || null,
        fullName: user.fullName || 'N/A',
        username: user.username || 'N/A',
        status: user.status || 'N/A',
        email: user.email || 'N/A',
      }));
      setUsers(transformedData);
      console.log("Fetched data: ", response.data);
      console.log("Transformed data: ", transformedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (id) => {
    alert(`Viewing user #${id}`);
    // Add logic to view user details
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
      accessorKey: "avatar",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Avatar <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <img
          src={row.getValue('avatar') || 'https://placehold.co/40x40'}
          alt="Avatar"
          className="h-10 w-10 rounded-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/40x40';
          }}
        />
      ),
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom Complet <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom Utilisateur <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Statut <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className={`size-2 ${row.getValue("status") === "Active" ? "bg-green-500" : "bg-red-500"} rounded-full`}/>
          {row.getValue('status')}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Action",
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
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleAddUser = () => {
    alert("Add new user clicked");
    // Add logic to open a form for adding a new user
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading className="animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">#Utilisateurs</h1>
            <Button
              onClick={handleAddUser}
              className="bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              Nouveau Utilisateur
            </Button>
          </div>
          <div className="bg-white p-4 rounded-xl  border-[0.2px] border-gray-200 shadow-md">
            <DataTable columns={columns} data={users} pageSize={10} />
          </div>
        </div>
      )}
    </>
  );
}