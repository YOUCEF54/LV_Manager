import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/Loading";
import DataTable from "../components/DataTable";
import { Button } from "../components/ui/button";
import { Edit, Trash } from "lucide-react";
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
import { Switch } from "../components/ui/switch";

export default function Charges() {
  const [isLoading, setIsLoading] = useState(false);
  const [charges, setCharges] = useState([]);
  const [formData, setFormData] = useState({
    libelle: "",
    date: null,
    description: "",
    amount: "",
    paymentMethod: "Especes",
    repeat: false,
    repetition: "Jours",
    cycles: "",
  });

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchCharges() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/charges`,
        { headers }
      );
      const transformedData = response.data.map((charge, index) => ({
        id: index + 1,
        date: charge.date || 'N/A',
        libelle: charge.libelle || 'N/A',
        amount: charge.amount || 0,
        description: charge.description || 'N/A',
        createdBy: charge.createdBy || 'N/A',
      }));
      setCharges(transformedData);
      console.log("Fetched data: ", response.data);
      console.log("Transformed data: ", transformedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCharges();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Charge submitted: " + JSON.stringify(formData));
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
      accessorKey: "libelle",
      header: "Libelle",
    },
    {
      accessorKey: "amount",
      header: "Montant",
      cell: ({ row }) => (
        <span>{row.getValue('amount')} €</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "createdBy",
      header: "Crée par",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-blue-500 hover:text-blue-700 transition-colors"
            onClick={() => alert(`Editing charge #${row.original.id}`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 transition-colors"
            onClick={() => alert(`Deleting charge #${row.original.id}`)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
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
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">#Charges</h1>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors">
              Charges Répétées
            </Button>
          </div>
          <div className="bg-white p-6 rounded-xl  border-[0.2px] border-gray-200 shadow-md">
            <h2 className="text-xl font-semibold mb-6">Ajouter une Charge</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Libelle <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.libelle}
                  onChange={(e) => handleInputChange("libelle", e.target.value)}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Libelle"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-300",
                        !formData.date && "text-gray-500"
                      )}
                    >
                      {formData.date ? format(formData.date, "PPP") : "Choisir une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => handleInputChange("date", date)}
                      initialFocus
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="md:col-span-2">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </Label>
                <Input
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Description"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Montant"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Méthode de paiement
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  value={formData.paymentMethod}
                >
                  <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Sélectionner une méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Especes">Espèces</SelectItem>
                    <SelectItem value="Carte">Carte</SelectItem>
                    <SelectItem value="Virement">Virement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Label className="text-sm font-medium text-gray-700">Charges Répétées</Label>
                  <Switch
                    checked={formData.repeat}
                    onCheckedChange={(checked) => handleInputChange("repeat", checked)}
                  />
                </div>
                {formData.repeat && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Répétition <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) => handleInputChange("repetition", value)}
                        value={formData.repetition}
                      >
                        <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Jours">Jours</SelectItem>
                          <SelectItem value="Semaines">Semaines</SelectItem>
                          <SelectItem value="Mois">Mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Nb. Cycles <span className="text-red-500">*</span> (0 pour illimité)
                      </Label>
                      <Input
                        type="number"
                        value={formData.cycles}
                        onChange={(e) => handleInputChange("cycles", e.target.value)}
                        className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Nb. Cycles"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors">
                  Enregistrer
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-6 p-4 bg-white rounded-xl  border-[0.2px] border-gray-200 shadow-md overflow-hidden">
            <DataTable
              columns={columns}
              data={charges}
              pageSize={10}
              className="min-w-full"
              rowClassName="hover:bg-gray-50 transition-colors"
            />
          </div>
        </div>
      )}
    </>
  );
}