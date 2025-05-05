import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/Loading";
import DataTable from "../components/DataTable";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "../lib/utils";
import { format } from "date-fns";

export default function Payments() {
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    contract: "",
    paymentMethod: "Especes",
    amount: "",
    date: null,
    description: "",
  });

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchPayments() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/payments`,
        { headers }
      );
      const transformedData = response.data.map((payment, index) => ({
        id: index + 1,
        date: payment.date || 'N/A',
        method: payment.method || 'N/A',
        amount: payment.amount || 0,
        contract: payment.contract || 'N/A',
        createdBy: payment.createdBy || 'N/A',
      }));
      setPayments(transformedData);
      console.log("Fetched data: ", response.data);
      console.log("Transformed data: ", transformedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment submitted: " + JSON.stringify(formData));
    // Add logic to submit the form data to the API here
  };

  const columns = [
    {
      accessorKey: "id",
      header: "#",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "method",
      header: "Methode",
    },
    {
      accessorKey: "amount",
      header: "Montant",
      cell: ({ row }) => (
        <span>{row.getValue('amount')} €</span>
      ),
    },
    {
      accessorKey: "contract",
      header: "Contrat",
    },
    {
      accessorKey: "createdBy",
      header: "Crée par",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
          onClick={() => alert(`Deleting payment #${row.original.id}`)}
        >
          <X className="h-4 w-4" />
        </Button>
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
          <div className="mb-4">
            <h1 className="text-xl font-semibold mb-4">#Paiements</h1>
            <div className=" p-4  border-[0.2px] border-gray-200 bg-background rounded-xl shadow-md ">
              <h2 className="text-lg font-medium mb-4">Ajouter une Paiement</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-1">
                    Contrat <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => handleInputChange("contract", value)}
                    value={formData.contract}
                  >
                    <SelectTrigger className="w-full bg-gray-50 outline-none border border-gray-300 ">
                      <SelectValue placeholder="Sélectionner un contrat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mohamed II Dacia LOGAN">Mohamed II Dacia LOGAN</SelectItem>
                      <SelectItem value="Salama II Jeep Cherokee">Salama II Jeep Cherokee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">
                    Methode de paiement <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                    value={formData.paymentMethod}
                  >
                    <SelectTrigger className="w-full bg-gray-50 outline-none border border-gray-300 ">
                      <SelectValue placeholder="Sélectionner une méthode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Especes">Espèces</SelectItem>
                      <SelectItem value="Carte">Carte</SelectItem>
                      <SelectItem value="Virement">Virement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">
                    Montant <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    className="w-full bg-gray-50 outline-none border border-gray-300 "
                    placeholder="Montant"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-1">
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-gray-50 outline-none border border-gray-300 ",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        {formData.date ? format(formData.date, "PPP") : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => handleInputChange("date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="md:col-span-2">
                  <Label className="block text-sm font-medium mb-1">
                    Description
                  </Label>
                  <Input
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full bg-gray-50 outline-none border border-gray-300 "
                    placeholder="Description"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 ">
                    Enregistrer
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-white rounded-xl  border-[0.2px] border-gray-200 shadow-md p-4">
            <DataTable columns={columns} data={payments} pageSize={10} />
          </div>
        </>
      )}
    </>
  );
}