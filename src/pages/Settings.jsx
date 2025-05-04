import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/Loading";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    companyLogo: null,
    stampLogo: null,
    raisonSociale: "",
    representativeName: "Mohamed Souragh",
    cinRepresentative: "SK10038",
    phoneFixed: "0512345678",
    phoneFax: "0512345678",
    rc: "",
    patente: "",
    if: "",
    ice: "",
    cnss: "",
    email: "contact@lvmanager.net",
    iban: "",
    surveyorName: "Mohamed El Rachid",
  });

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchSettings() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/settings`,
        { headers }
      );
      setSettings(response.data);
      console.log("Fetched data: ", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSettings((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in settings) {
      formData.append(key, settings[key]);
    }
    alert("Settings submitted: " + JSON.stringify(Object.fromEntries(formData)));
    // Add logic to submit the form data to the API here
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading className="animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">#Paramètres</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Société Logo</Label>
                <Input
                  type="file"
                  name="companyLogo"
                  onChange={handleFileChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {settings.companyLogo && (
                  <img
                    src={URL.createObjectURL(settings.companyLogo)}
                    alt="Company Logo"
                    className="mt-2 h-20 w-auto object-contain"
                  />
                )}
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Cachet Logo</Label>
                <Input
                  type="file"
                  name="stampLogo"
                  onChange={handleFileChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {settings.stampLogo && (
                  <img
                    src={URL.createObjectURL(settings.stampLogo)}
                    alt="Stamp Logo"
                    className="mt-2 h-20 w-auto object-contain"
                  />
                )}
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Raison Sociale</Label>
                <Input
                  name="raisonSociale"
                  value={settings.raisonSociale}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Raison Sociale"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Nom Complet du Représentant</Label>
                <Input
                  name="representativeName"
                  value={settings.representativeName}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Nom Complet"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">CIN du Représentant</Label>
                <Input
                  name="cinRepresentative"
                  value={settings.cinRepresentative}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="CIN"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Téléphone Fixe</Label>
                <Input
                  name="phoneFixed"
                  value={settings.phoneFixed}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Téléphone Fixe"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Téléphone Fax</Label>
                <Input
                  name="phoneFax"
                  value={settings.phoneFax}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Téléphone Fax"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">RC</Label>
                <Input
                  name="rc"
                  value={settings.rc}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="RC"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Patente</Label>
                <Input
                  name="patente"
                  value={settings.patente}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Patente"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">IF</Label>
                <Input
                  name="if"
                  value={settings.if}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="IF"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">ICE</Label>
                <Input
                  name="ice"
                  value={settings.ice}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="ICE"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">CNSS</Label>
                <Input
                  name="cnss"
                  value={settings.cnss}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="CNSS"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
                <Input
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Email"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">IBAN</Label>
                <Input
                  name="iban"
                  value={settings.iban}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="IBAN"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Nom du Relèveur</Label>
                <Input
                  name="surveyorName"
                  value={settings.surveyorName}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Nom du Relèveur"
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                  Enregistrer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}