/* eslint-disable react/prop-types */
import React from 'react'

export default function VihiculesCards({vehicle}) {
    const NbrJours = 7
  return (
    <div className="grid grid-cols-3 p-2 my-3 bg-slate-400 rounded-lg">
        <div className="flex flex-col items-center ">
            <img src={`${vehicle.imagePath !==null ?  "app_assets/vehicules/"+vehicle.imagePath :''}`} alt="car" loading='lazy' className="w-2/3"/><br/>
            <h3>
                {vehicle.matricule}
            </h3>
        </div>
            <div className="flex flex-col items-center ">
                <h2 className="font-semibold text-lg">${vehicle.libelle} </h2>
                <h3 className="text-base font-medium">${vehicle.libelleCat} </h3>
                <div className="flex flex-row gap-2 text-xs font-medium py-2 ">
                    <div className="block">
                        <div className="inline-flex gap-x-1 ">
                            <img src="./contratPreviewAssets/contratCarSvg/car-seat.svg" loading='lazy' className="w-5 h-6 "/>
                            <p>${vehicle.NbPlaces}</p>
                        </div>
                        <p className="bottom-0">SIÈGES</p>
                    </div>
                    <div className="block">
                        <div className="inline-flex gap-x-1">
                            <img src="./contratPreviewAssets/contratCarSvg/car-door.svg" loading='lazy' className="w-5 h-6 "/>
                            <p>${vehicle.NbPortes}</p>
                        </div>
                        <p className="bottom-0 ">PORTES</p>
                    </div>
                    <div>
                        <div className="inline-flex gap-x-1 items-center">
                            <img src="./contratPreviewAssets/contratCarSvg/car-ac.svg" loading='lazy' className="w-5 h-6 "/>
                        </div>
                        <p className="bottom-0 ">A/C</p>
                    </div>
                </div>
                <div className="flex flex-row gap-2 text-xs font-medium py-2">
                    <div>
                        <div className="inline-flex gap-x-1 ">
                            <img src="./contratPreviewAssets/contratCarSvg/manual-gearbox.svg" loading='lazy' className="w-5 h-6"/>
                        </div>
                        <p> ${vehicle.transmission}</p>
                    </div>
                    <div>
                        <div className="inline-flex gap-x-1">
                            <img src={null} loading='lazy' className="w-5 h-6"/>
                        </div>
                        <p> {`${vehicle.carburant}`}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
                    <h2 className="font-semibold text-lg">{vehicle.prixJournelle*NbrJours} MAD/Total</h2>
                    <h3 className="text-base font-medium">{NbrJours} Jours</h3>
                    <button onClick="window.open('newContartChooseClient.php?localDep=${localDep}&localArriv=${localArriv}&date_heureDep=${dateDebut}&nbrJour=${NbrJours}&matricule=${selectedMatricule}','_self')"
                    className="Filter-drops  text-center w-2/3 hover:text-yellow-500 border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-3 py-1.5 bg-yellow-400 text-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                    type="button">LOUER</button>
                </div>
            </div>
     
  )
}
