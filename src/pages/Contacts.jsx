import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/Loading";
import { Button } from "../components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Contacts() {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchContacts() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/contacts`,
        { headers }
      );
      const transformedData = response.data.map((contact, index) => ({
        id: index + 1,
        fullName: contact.fullName || 'N/A',
        phone: contact.phone || 'N/A',
        address: contact.address || 'N/A',
        createdBy: contact.createdBy || 'N/A',
      }));
      setContacts(transformedData);
      console.log("Fetched data: ", response.data);
      console.log("Transformed data: ", transformedData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Contact submitted: " + JSON.stringify(formData));
    // Add logic to submit the form data to the API here
  };

  const handleEdit = (id) => {
    alert(`Editing contact #${id}`);
    // Add logic to edit the contact
  };

  const handleDelete = (id) => {
    alert(`Deleting contact #${id}`);
    // Add logic to delete the contact
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading className="animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto ">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">#Contacts</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Nom Complet</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Crée par</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{contact.id}</TableCell>
                      <TableCell>{contact.fullName}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.address}</TableCell>
                      <TableCell>{contact.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-blue-500 hover:text-blue-700 transition-colors"
                            onClick={() => handleEdit(contact.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Ajouter un contact</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Nom Complet"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Téléphone"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Adresse"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                  Enregistrer
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}