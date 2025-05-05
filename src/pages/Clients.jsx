import { ArrowUturnLeftIcon, CalendarDateRangeIcon, ChevronDownIcon, CurrencyDollarIcon, EllipsisVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Loading from "../../public/Loading";
import DataTable from "../components/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import PropTypes from 'prop-types';
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";

const DropDown = ({ libelle, dataset, topMsg, setState, state }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{libelle}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{topMsg}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={state} onValueChange={setState}>
          {dataset?.map((e, index) => (
            <DropdownMenuRadioItem key={index} value={e}>{e}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

DropDown.propTypes = {
  libelle: PropTypes.string.isRequired,
  dataset: PropTypes.array,
  topMsg: PropTypes.string,
  setState: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
};

export default function Client() {
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchClients() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/clients`,
        { headers }
      );
      // Transform the data to match the table structure
      const transformedData = response.data.map(client => ({
        id: client.id || 'N/A',
        avatar: client.avatar || null,
        name: client.name || 'N/A',
        email: client.email || 'N/A',
        phone: client.phone || 'N/A',
        status: client.status || 'N/A',
        balance: client.balance || 0,
      }));
      setClients(transformedData);
      console.log("Fetched data: ", response.data);
      console.log("Transformed data: ", transformedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = [
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
          src={row.getValue('avatar')} 
          alt="Client" 
          className="h-10 w-10 rounded-full mx-auto object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400';
          }}
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom <ArrowUpDown />
        </Button>
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
      accessorKey: "phone",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Téléphone <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "balance",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Solde <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{row.getValue('balance')} €</span>
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
          <div className={`size-2 ${row.getValue("status") === "Actif" ? "bg-green-500" : row.getValue("status") === "Inactif" ? "bg-red-500" : "bg-yellow-500"} rounded-full`}/>
          {row.getValue('status')}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`Editing ${row.original.id}`)}>
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deleting ${row.original.id}`)}>
              Supprimer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert(`Viewing details of ${row.original.id}`)}>
              Voir Détails
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const [state, setState] = useState("Actif");

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">#Clients</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 py-1 rounded-md bg-black text-white">
                Liste noire
              </button>
              <button className="p-2 py-1 rounded-md bg-blue-500 text-white">
                Nouveau client
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 my-4">
            <DropDown 
              libelle="Par statuts" 
              topMsg="Sélectionner un statut" 
              state={state} 
              setState={setState} 
              dataset={["Actif", "Inactif", "Suspendu"]} 
            />
          </div>
          <div className="flex justify-between z-30 items-center my-2">
            <div className="flex items-center gap-1">
              Afficher{" "}
              <DropDown 
                libelle="10" 
                topMsg="Nombre d'entrées" 
                dataset={[10, 20, 30, 50]} 
                state={state} 
                setState={setState} 
              />{" "}
              entrées
            </div>
            <div>
              Rechercher
              <input
                type="text"
                placeholder="Tapez quelque chose..."
                className="p-2 py-1 ml-2 border-neutral-400 outline-none border rounded-md"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg  border-[0.2px] border-gray-200 shadow-md p-4">
            <DataTable columns={columns} data={clients} pageSize={10} />
          </div>
        </>
      )}
    </>
  );
}