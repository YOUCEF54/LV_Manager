
// eslint-disable-next-line react/prop-types
export default function TopVehicules({ className }) {
  return (
    <div className={`flex flex-col p-6 min-h-60 ${className}`}>
      <div className="flex sticky left-0 top-0 bg-white filter-none backdrop-blur-lg bg-opacity-50 pb-6  right-0  items-center justify-between">
        <h1 className="font-semibold text-xl">Meilleurs véhicules</h1>
        <div className="right-0">
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-clip ">
        <table className="w-full  min-w-[50rem] border-collapse ">
          <thead>
            <tr className="bg-slate-200 bg-opacity-70">
              <th className="rounded-l-lg font-medium">Véhicule</th>
              <th className="p-3 font-medium">Nombre de contrats</th>
              <th className="p-3 font-medium">Nombre de jours loué</th>
              <th className="p-3 font-medium">Montant</th>
              <th className="p-3 font-medium rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index} className="text-neutral-600">
                <td className="p-6 text-center">Clio 4</td>
                <td className="p-6 text-center">8</td>
                <td className="p-6 text-center">7</td>
                <td className="p-6 text-center">500DH</td>
                <td className="p-4 text-center">
                  {index !== 2 ? (
                    <span className="bg-emerald-500 font-medium text-white py-1 px-6 rounded-full">Active</span>
                  ) : (
                    <span className="bg-red-500 font-medium text-white py-1 px-4 rounded-full">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
