/* eslint-disable react/prop-types */
import { ArrowUturnLeftIcon, CalendarDateRangeIcon, CalendarIcon, ChevronDownIcon, CurrencyDollarIcon, EllipsisVerticalIcon, EyeDropperIcon, EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Loading from "../../public/Loading";
import { useEffect, useRef, useState } from "react";
import whatsappIcon from "../../public/whatsapp.svg"
import NewContract from "../components/NewContract";
import { useSelector,useDispatch } from 'react-redux';
import { setIsOpenNewContrat } from "../redux/newContratSlice";
import DataTable from "../components/DataTable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";



export default function Reservations() {
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [allContrats, setAllContrats] = useState([]); // Store all data
  const [reservations, setReservations] = useState([]); // Filtered data

  const [searchQuery, setSearchQuery] = useState({ from: null, value: "" });
  
  // const isNewContratOpen = useSelector(state => state?.newContrat?.value?.isOpen)
  const dispatch = useDispatch()


  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };
  async function fetchReservations() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/reservations?fetchType=all`,
        { headers }
      );
      setIsLoading(false);
      setAllContrats(response.data); // Store fetched data
      setReservations(response.data); // Initially display all data
      console.log("Résérvations: ",response); 
      setHasFetched(true);
    } catch (error) {
      console.error(error);
    }
  }

  
  useEffect(() => {
    fetchReservations();

  }, []);
  
  useEffect(() => {
    if (!searchQuery.from) {
      setReservations(allContrats); // Reset to all data if no filter applied
      return;
    }
  
  
  }, [searchQuery, allContrats]);
  
  // Update searchQuery on filter change
  function handleSearch(from, value) {
    setSearchQuery({ from, value });
  }


          
const columns = [
  {
    accessorKey: "contratId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Réf <ArrowUpDown />
      </Button>
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
        Date <ArrowUpDown />
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
        Véhicule <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "dateDep",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       Date Départ <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "dateArriv",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Local Départ <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "nomClient",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Arrivé <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "tel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Local Arrivé <ArrowUpDown />
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
        Client <ArrowUpDown />
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
        Téléphone <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "statut",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Statut <ArrowUpDown />
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
    <div className="">
      <NewContract/>
      <div className="max-sm:flex  top-0 grid grid-cols-2 max-sm:flex-col gap-2 items-center max-sm:items-start justify-between">
        <h1 className="text-3xl  font-semibold text-neutral-700">Résérvations</h1>
     
      
      </div>
        
      <div className="overflow-x-auto mb-32  border-[0.2px] border-gray-200 min-h-[25rem] mt-5  overflow-y-clip relative  bg-white shadow-md p-4 rounded-xl">
        <div className=" mb-2 flex justify-start ">
          <div className="flex whitespace-nowrap gap-2 mb-2  w-1/3">
            
            <input 
              onChange={(e)=>{handleSearch("G",e.target.value)}}              
              className="outline-none  z-500  duration-100 ease-in-out bg-white p-1 w-full px-3 rounded-md border border-neutral-300 focus:border-blue-600 "
              type="text" placeholder="Rechercher par référence, véhicule, client..."/>
            </div>
        </div>
        <DataTable columns={columns} data={reservations} />
      </div>
    </div>
  )
}
