import { ChevronDownIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

export default function GanttChart() {
  const [duration, setDuration] = useState("thisWeek");
  const [fleetData, setFleetData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getFleetUtilization(duration);
  }, [duration]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };

  async function getFleetUtilization(duration) {
    try {
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/analytics/fleetUtilization?duration=${duration}`,
        { headers }
      );
      setFleetData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getDatesForDuration = (duration) => {
    const today = new Date();
    let startDate, endDate;

    switch (duration) {
      case "thisWeek":
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case "thisMonth":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        startDate = new Date();
        endDate = new Date();
    }

    const dates = [];
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }
    return dates;
  };

  const renderGanttChartRow = (vehicle) => {
    const { details, rentals, reservations } = vehicle || {};
    if (!details) return null;

    const { libelle, imgPrinc } = details;
    const dates = getDatesForDuration(duration);

    return (
      <tr key={details.matricule} className="hover:bg-gray-50">
        <td className="px-3 py-2">
          <div className="flex flex-row gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={
                imgPrinc
                  ? `${imgPrinc}`
                  : "https://via.placeholder.com/40"
              }
              alt="Véhicule"
            />
            <p className="text-center font-semibold">{libelle}</p>
          </div>
        </td>
        {dates.map((date) => {
          const dateString = date.toISOString().slice(0, 10);

          if (rentals?.[dateString]?.rented) {
            return (
              <td
                key={date}
                className="px-4 py-2 border border-gray-200 bg-green-500 text-white font-semibold cursor-pointer"
                onClick={() =>
                  window.open(
                    `contrat2preview.html?contratId=${rentals[dateString].contratId}`,
                    "_self"
                  )
                }
              >
                Contrat ID: {rentals[dateString].contratId}
                <br />
                Client: {rentals[dateString].client}
                <br />
                Départ: {rentals[dateString].dateDep}
                <br />
                Arrivée: {rentals[dateString].dateArriv}
              </td>
            );
          } else if (reservations?.[dateString]?.reserved) {
            return (
              <td
                key={date}
                className="px-4 py-2 border border-gray-200 bg-blue-500 text-white font-semibold cursor-pointer"
              >
                Réservation ID: {reservations[dateString].reservationId}
                <br />
                Client: {reservations[dateString].client}
                <br />
                Départ: {reservations[dateString].dateDep}
                <br />
                Jours: {reservations[dateString].jours}
              </td>
            );
          } else {
            return <td key={date} className="px-4 py-2 border border-gray-200"></td>;
          }
        })}
      </tr>
    );
  };

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
    <div className="mt-2 w-full rounded-lg shadow bg-white p-4 md:p-6">
      <div className="flex flex-row justify-between items-center py-3">
        <h3 className="text-2xl font-bold">Utilisation du Flott</h3>
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-center items-center gap-1 text-neutral-400 border p-2 py-1 rounded-lg border-neutral-300 bg-neutral-50"
          >
            <div className="text-[12px]">
              {duration === "thisWeek" ? "Cette semaine" : "Ce mois"}
            </div>
            <ChevronDownIcon className="size-4" />
          </button>
          <ul
            className={`absolute top-10 right-0 w-40 rounded-lg shadow-md border bg-white p-2 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li
              onClick={() => {
                setDuration("thisMonth");
                setIsOpen(false);
              }}
              className="p-2 cursor-pointer rounded-lg hover:bg-gray-100"
            >
              Ce mois
            </li>
            <li
              onClick={() => {
                setDuration("thisWeek");
                setIsOpen(false);
              }}
              className="p-2 cursor-pointer rounded-lg hover:bg-gray-100"
            >
              Cette semaine
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-1 text-gray-700">Véhicule/Jour</th>
              {getDatesForDuration(duration).map((date) => {
                const dateObj = new Date(date);
                const dayName = dateObj.toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                });
                return (
                  <th key={date} className="px-4 py-2 text-gray-700">
                    {dayName}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(fleetData).map((matricule) =>
              renderGanttChartRow(fleetData[matricule])
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
