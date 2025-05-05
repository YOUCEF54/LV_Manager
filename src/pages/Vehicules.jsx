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

const DropDown = ({ libelle, dataset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-fit whitespace-nowrap">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center gap-1 text-sm text-neutral-500 border p-2 py-1 rounded-[5px] border-neutral-400 bg-neutral-50"
      >
        <div className="">
          {libelle}
        </div>
        <ChevronDownIcon className="size-4" />
      </button>
      <ul
        className={`absolute top-8 right-0 text-sm w-fit min-w-full rounded-lg shadow-md border bg-white p-1 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {dataset?.map((e, index) => (
          <li
            key={index}
            className="p-2 py-1 cursor-pointer rounded-md hover:bg-gray-100"
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropDown.propTypes = {
  libelle: PropTypes.string.isRequired,
  dataset: PropTypes.array,
};

export default function Vehicules() {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicules, setVehicules] = useState([]);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchVehicules() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/vehicles`,
        { headers }
      );
      // Transform the data to match the table structure
      const transformedData = response.data.map(vehicle => ({
        id: vehicle.matricule,
        imgPrinc: vehicle.imgPrinc || null, // Add default image if needed
        libelle: vehicle.libelle || 'N/A',
        libelleCat: vehicle.libelleCat || 'N/A',
        libelleMarque: vehicle.libelleMarque || 'N/A',
        modele: vehicle.matricule || 'N/A', // Fixed: Changed from 'matricule' to 'modele'
        matricule: vehicle.matricule || 'N/A',
        montantAPayer: vehicle.matricule || 0,
        status: vehicle.status || 'N/A',
        transmission: vehicle.matricule || 'N/A' // Added transmission field
      }));
      setVehicules(transformedData);
      console.log("Fetched data: ", response.data);
      console.log("Tranformed data: ",transformedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchVehicules();
  }, []);

  const columns = [
    {
      accessorKey: "imgPrinc",
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
          src={row.getValue('imgPrinc')} 
          alt="Vehicle" 
          className="h-10 w-10 rounded-full mx-auto object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400'; // Fallback image
          }}
        />
      ),
    },
    {
      accessorKey: "libelle",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Libelle <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "libelleCat",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Catégorie <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "libelleMarque",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marque <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "modele",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modèle <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "matricule",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          N° Matricule <ArrowUpDown />
        </Button>
      ),
    },
    {
      accessorKey: "montantAPayer",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Paiements <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{row.getValue('montantAPayer')} €</span>
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
          {}
          Statut <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className={`size-2 ${row.getValue("status") == "Louée" ? "bg-red-500": row.getValue("status") == "Disponible" ?" bg-green-500 ":" bg-yellow-500"}  rounded-full`}/>
          {row.getValue('status')}
        </div>
      ),
    },
    {
      accessorKey: "transmission",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transmission <ArrowUpDown />
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
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`Editing ${row.original.id}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Deleting ${row.original.id}`)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert(`Viewing details of ${row.original.id}`)}>
              View Details
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
        <>
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">#Véhicules</h1>
            <div className="flex items-center gap-2">
              <DropDown libelle="Gérer les..." dataset={["1", "2"]} />
              <button className="p-2 text-sm py-1 rounded-md bg-blue-500 text-white">
                Nouveau Véhicule
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 my-4">
            <DropDown libelle="Par catégories" dataset={[]} />
            <DropDown libelle="Par marques" dataset={[]} />
            <DropDown libelle="Par statuts" dataset={[]} />
          </div>
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center gap-1 ">
              show <DropDown libelle="10" dataset={[10, 20, 30, 50]} /> entries
            </div>
            <div>
              search
              <input
                type="text"
                placeholder="type something..."
                className="px-2 py-1 ml-2  border-[0.2px] border-gray-200 outline-none  rounded-md"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg  border-[0.2px] border-gray-200   shadow p-4">
            <DataTable columns={columns} data={vehicules} pageSize={10} />
          </div>
        </>
      )}
    </>
  );
}