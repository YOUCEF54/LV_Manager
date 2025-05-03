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

const DropDown = ({libelle, dataset}) =>{
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
            className="flex justify-center items-center gap-1 text-sm text-neutral-500 border p-2 py-1 rounded-[5px] border-neutral-300 bg-neutral-50"
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
            {dataset?.map((e,index)=>(
                <li
                key={index}
                className="p-2 py-1 cursor-pointer rounded-md hover:bg-gray-100"
                >
                {e}
                </li>
            ))}
 
          </ul>
        </div>
    )
}

export default function Contrats() {
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [allContrats, setAllContrats] = useState([]); // Store all data
  const [contrats, setContrats] = useState([]); // Filtered data
  const [vehicles, setVehicles] = useState([]); 
  const [clients, setClients] = useState([]); 
  const [searchQuery, setSearchQuery] = useState({ from: null, value: "" });
  
  // const isNewContratOpen = useSelector(state => state?.newContrat?.value?.isOpen)
  const dispatch = useDispatch()


  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };
  async function fetchContrats() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/contrats`,
        { headers }
      );
      setIsLoading(false);
      setAllContrats(response.data); // Store fetched data
      setContrats(response.data); // Initially display all data
      console.log("Contrats: ",response.data); 
      setHasFetched(true);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchVehicles() {
    try {
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/vehicles`,
        { headers }
      );
      setVehicles(response.data.map(e=>e.libelle)); 
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchClients() {
    try {
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/clients`,
        { headers }
      );
      setClients(response.data.map(e=>e.nomClient)); 
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchContrats();
    fetchVehicles();
    fetchClients();
  }, []);
  
  useEffect(() => {
    if (!searchQuery.from) {
      setContrats(allContrats); // Reset to all data if no filter applied
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
  
    setContrats(filteredContrats);
  }, [searchQuery, allContrats]);
  
  // Update searchQuery on filter change
  function handleSearch(from, value) {
    setSearchQuery({ from, value });
  }

  function sendWatshappRappelMessage(e) {
    const contrat = contrats.find(contract => contract.contratId === e.contratId);

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
          
          const Prolonger = ()=>{
            return(
            <div style={{zIndex : 80}} onClick={()=>setIsPopUpOpen(false)} className={`absolute ${isPopUpOpen ? "flex" : "hidden"} bg-opacity-55 backdrop-blur-sm inset-0  items-center justify-center bg-black`}>
              <div onClick={(e)=>e.stopPropagation()} className="bg-white min-w-[25rem] p-4 rounded-xl shadow-md">
        
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Aout de Prolongation</h2>
                  <XMarkIcon onClick={()=>setIsPopUpOpen(false)} className="size-5 cursor-pointer"/>
                </div>
                <div>
                  <h3>Contrat : 5</h3>
                  <p>Le contrat est prolongé pour 1 an</p>
                </div>
        
        
              </div>
            </div>)
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
        Véhicule <ArrowUpDown />
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
        Nº matricule <ArrowUpDown />
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
        Date de départ <ArrowUpDown />
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
        Date de retour <ArrowUpDown />
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
        Client <ArrowUpDown />
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
        Téléphone <ArrowUpDown />
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

          
          // const data = [
          //   { id: 1, name: "Alice Johnson", email: "alice@example.com" },
          //   { id: 2, name: "Bob Smith", email: "bob@example.com" },
          //   { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
          // ];
          
          return (
            <div className=" w-full">
      <Prolonger/>
      {/* <div onClick={()=>{setIsOpen(false)}} className={`absolute drop-shadow-lg  bg-black flex inset-0 z-400 bg-opacity-50 ${!isOpen &&" hidden"}`}> */}

        {/* <div className="flex flex-col bg-white m-auto w-[30vw] p-2 rounded-lg">
          <button onClick={()=>{setSearchQuery("Ref")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Ref</button>
          <button onClick={()=>{setSearchQuery("Véhicule")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Véhicule</button>
          <button onClick={()=>{setSearchQuery("Client")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Client</button>
          <button onClick={()=>{setSearchQuery("Status")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Status</button>
        </div> */}
      {/* </div> */}
      <NewContract/>
      <div className="max-sm:flex  top-0 grid grid-cols-2 max-sm:flex-col gap-2 items-center max-sm:items-start justify-between">
        <h1 className="text-3xl  font-semibold text-neutral-700">Contrats</h1>
        <div className="flex max-sm:w-full  justify-end duration-100 max-sm:mt-6  items-center gap-2 whitespace-nowrap">
          <button  className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 max-sm:p-2 max-sm:w-full text-white">Factures</button>
          <button onClick={()=>dispatch(setIsOpenNewContrat(true))} className="flex items-center max-sm:gap-2 max-sm:justify-center whitespace-nowrap max-sm:p-2 pl-1 max-sm:w-full bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 text-white">
            <PlusIcon className="size-5"/>
            Nouveau contrat</button>
        </div>
       
      </div>
            <div className="felx flex-col  pt-10 mb-4 top-9 overflow-y-visible  z-50 inset-0 mt-0">
              <div className="flex gap-6 flex-wrap w-full justify-between pb-2  whitespace-nowrap ">
                <span className="font-semibold">Filtré par</span>
                <div className="flex  items-center gap-2 z-50 ">
                    <DropDown libelle="Par véhicules" dataset = {[
                      <input onChange={(e)=>{handleSearch("V", e.target.value)}} type="text" placeholder="Rechercher ..."  className="bg-transparent  max-w-32 outline-none" key={1}/>,
                      vehicles]}/>
                    <DropDown libelle="Par clients" dataset = {[
                      <input onChange={(e)=>{handleSearch("C",e.target.value)}} type="text" placeholder="Rechercher ..."  className="bg-transparent  max-w-32 outline-none" key={1}/>,
                      clients]}/>
                    <DropDown libelle="Par paiement" dataset = {[
                      <label className="flex items-center gap-2" htmlFor="paye" key={2}><input className="size-3" id="paye" type="checkbox"/>Payé</label>,
                      <label className="flex items-center gap-2" htmlFor="encours" key={2}><input className="size-3" id="encours" type="checkbox"/>En cours</label>,

                      ]}/>
                    <DropDown libelle="Par statut" dataset = {[
                      <label className="flex items-center gap-2" htmlFor="active" key={2}><input className="size-3" id="active" type="checkbox"/>Active</label>,
                      <label className="flex items-center gap-2" htmlFor="termine" key={2}><input className="size-3" id="termine" type="checkbox"/>Terminé</label>,]}/>                    
                </div>
              </div>
            </div>
      <div className="overflow-x-auto mb-32  min-h-[25rem]  overflow-y-clip relative  bg-white shadow-md p-4 rounded-xl">
            <div className=" mb-2 flex justify-start ">
              <div className="flex whitespace-nowrap gap-2 mb-2  w-1/3">
                {/* <button onClick={()=>setIsOpen(true)} className="p-2 rounded-lg h-full bg-blue-600 flex items-center gap-2 text-white">{searchQuery || "search by"}
                  <ChevronDownIcon className="size-5"/>
                </button> */}
                <input 
                  onChange={(e)=>{handleSearch("G",e.target.value)}}              
                  className="outline-none  z-500  duration-100 ease-in-out bg-white p-1 w-full px-3 rounded-md border border-neutral-300 focus:border-blue-600 "
                  type="text" placeholder="Rechercher par référence, véhicule, client..."/>
                </div>
          </div>
          <DataTable columns={columns} data={contrats} pageSize={10} />
        </div>
    </div>
  )
}
