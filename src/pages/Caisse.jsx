import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../public/Loading";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

export default function CashRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function fetchCashData() {
    try {
      setIsLoading(true);
      const [revenuesResponse, expensesResponse] = await Promise.all([
        axios.get(`https://beta.lvmanager.net/tenants/cash-register/revenues`, { headers }),
        axios.get(`https://beta.lvmanager.net/tenants/cash-register/expenses`, { headers }),
      ]);
      const transformedRevenues = revenuesResponse.data.map((rev, index) => ({
        id: index + 1,
        date: rev.date || 'N/A',
        amount: rev.amount || 0,
        description: rev.description || 'N/A',
        createdBy: rev.createdBy || 'N/A',
      }));
      const transformedExpenses = expensesResponse.data.map((exp, index) => ({
        id: index + 1,
        date: exp.date || 'N/A',
        amount: exp.amount || 0,
        description: exp.description || 'N/A',
        createdBy: exp.createdBy || 'N/A',
      }));
      setRevenues(transformedRevenues);
      setExpenses(transformedExpenses);
      setTotal(revenuesResponse.data.reduce((sum, rev) => sum + (rev.amount || 0), 0) - expensesResponse.data.reduce((sum, exp) => sum + (exp.amount || 0), 0));
      console.log("Fetched revenues: ", revenuesResponse.data);
      console.log("Fetched expenses: ", expensesResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCashData();
  }, []);

  const handleAddRevenue = () => {
    alert("Ajouter revenu clicked");
    // Add logic to open a form for adding revenue
  };

  const handleAddExpense = () => {
    alert("Ajouter dépenses clicked");
    // Add logic to open a form for adding expense
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading className="animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg mb-6 text-center">
            <h1 className="text-2xl font-bold">{total.toLocaleString()} MAD</h1>
            <p className="text-sm">Dans la caisse</p>
          </div>
          <div className="flex justify-center mb-6 space-x-4">
            <Button
              onClick={handleAddRevenue}
              className="bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              Ajouter revenu
            </Button>
            <Button
              onClick={handleAddExpense}
              className="bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Ajouter dépenses
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Impots</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Revenu</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Crée par</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenues.map((rev) => (
                    <TableRow key={rev.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{rev.date}</TableCell>
                      <TableCell>{rev.amount} DH</TableCell>
                      <TableCell>{rev.description}</TableCell>
                      <TableCell>{rev.createdBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Dépôts</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Dépenses</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Crée par</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((exp) => (
                    <TableRow key={exp.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{exp.date}</TableCell>
                      <TableCell>{exp.amount} DH</TableCell>
                      <TableCell>{exp.description}</TableCell>
                      <TableCell>{exp.createdBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}