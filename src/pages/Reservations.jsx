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
      console.log("Résérvations: ",response.data); 
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
  
    let filteredContrats = allContrats;
  
    switch (searchQuery.from) {
      case "V": // Filter by vehicle
        filteredContrats = allContrats.filter((e) =>
          e?.libelle?.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      case "C": // Filter by client
        filteredContrats = allContrats.filter((e) =>
          e?.nomClient?.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      case "G": // General search (all attributes)
        filteredContrats = allContrats.filter((e) =>
            Object.values(e).some(value =>
                String(value)?.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        );
        break;
      default:
        break;
    }
  
    setReservations(filteredContrats);
  }, [searchQuery, allContrats]);
  
  // Update searchQuery on filter change
  function handleSearch(from, value) {
    setSearchQuery({ from, value });
  }

  function sendWatshappRappelMessage(e) {
    const contrat = reservations.find(reservation => reservation.reservationId === e.reservationId);

    if (!contrat) {
        console.error("Contract not found!");
        console.error(contrat);
        return;
    }

    let Reste = contrat.montantAPayer - contrat.avance;
    const websiteLink = window.location.protocol + '//' + window.location.hostname;
    let whatsappMessage =
        `Bonjour ${contrat.nomClient}, Ceci est un rappel pour payer le montant dû (${Reste} DH)
          Détails du contrat:
          Date de début: ${contrat.dateDep}.
          Date de retour: ${contrat.dateArriv}.
          Total à payer: ${contrat.montantAPayer} DH.
          Montant fourni: ${contrat.avance} DH.
          Reste: ${Reste} DH.

          Pour plus de détails, veuillez visiter ce lien et saisir votre CIN:
          ${websiteLink}/admin/clientPrintContrat.html?contratId=${contrat.contratsId}
          Nous vous remercions de votre coopération et nous restons à votre disposition pour toute assistance supplémentaire. N'hésitez pas à nous contacter en cas de questions ou de préoccupations.

          Cordialement`;

          const whatsappUrl = `https://wa.me/${contrat.tel.replace(/^\d/, '+212')}?text=${encodeURIComponent(whatsappMessage)}`;
          window.open(whatsappUrl, '_blank');
      }

          
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [openActions, setOpenActions] = useState({contrat : null,state : false})
          


          
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
    <div className="pr-2 ">
      <NewContract/>
      <div className="max-sm:flex  top-0 grid grid-cols-2 max-sm:flex-col gap-2 items-center max-sm:items-start justify-between">
        <h1 className="text-3xl  font-semibold text-neutral-700">Résérvations</h1>
        <div className="flex max-sm:w-full  justify-end duration-100 max-sm:mt-6  items-center gap-2 whitespace-nowrap">
          <button  className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 max-sm:p-2 max-sm:w-full text-white">Factures</button>
          <button onClick={()=>dispatch(setIsOpenNewContrat(true))} className="flex items-center max-sm:gap-2 max-sm:justify-center whitespace-nowrap max-sm:p-2 pl-1 max-sm:w-full bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 text-white">
            <PlusIcon className="size-5"/>
            Nouveau contrat</button>
        </div>
      
      </div>
        
      <div className="overflow-x-auto mb-32  min-h-[25rem] mt-5  overflow-y-clip relative  bg-white shadow-md p-4 rounded-xl">
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
