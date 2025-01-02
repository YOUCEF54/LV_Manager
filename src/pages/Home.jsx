import { Link } from "react-router-dom";
import img from "../../public/carsRental1.jpg"
import img2 from "../../public/autom.jpeg"

export default function Home() {
  return (
   <div>
    <div className=" fixed z-50 w-full  mix-blend-difference   backdrop-blur-lg">
     <div className="flex justify-between p-4 px-6 max-w-[80rem] m-auto text-white">
        <div className="font-semibold text-xl">
          LV Manager
        </div>
        <ul className="flex gap-4">
          <Link className=" flex justify-center before:ease-in-out relative before:duration-200 before:rounded-full before:h-[2px] before:hover:w-full before:w-0 before:active:w-full before:active:bg-blue-900 before:bg-white before:absolute before:bottom-0 "><li>Acceuil</li></Link>
          <Link className=" flex justify-center before:ease-in-out relative before:duration-200 before:rounded-full before:h-[2px] before:hover:w-full before:w-0 before:active:w-full before:active:bg-blue-900 before:bg-white before:absolute before:bottom-0 "><li>Véhicules</li></Link>
          <Link className=" flex justify-center before:ease-in-out relative before:duration-200 before:rounded-full before:h-[2px] before:hover:w-full before:w-0 before:active:w-full before:active:bg-blue-900 before:bg-white before:absolute before:bottom-0 "><li>Avis Clients</li></Link>
          <Link className=" flex justify-center before:ease-in-out relative before:duration-200 before:rounded-full before:h-[2px] before:hover:w-full before:w-0 before:active:w-full before:active:bg-blue-900 before:bg-white before:absolute before:bottom-0 "><li>Nous Contacter</li></Link>
        </ul>
    </div>
    </div>
    <div className="w-full relative  flex items-center justify-center ">
      <div className="w-full h-full bg-black absolute bg-opacity-70"/>
      <img className=" object-cover w-full max-h-[70vh] " src={img}/>
      <div className="text-white absolute w-full text-center max-w-[70rem] px-6  m-auto">
        <h1 className="text-5xl font-semibold">Location de Voitures</h1>
        <p className="text-lg mt-2 max-w-[45rem] m-auto">La meilleur location de voiture au maroc, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem velit suscipit, temporibus similique dolorem saepe veritatis, numquam autem vel ut quis?</p>
        <button className="p-2 backdrop-blur-md text-blue-200 hover:text-blue-50 duration-100  border border-blue-500 bg-opacity-50 hover:bg-opacity-50  bg-blue-950  hover:bg-blue-800 rounded-full px-4 font-medium mt-4">Nos véhicules</button>
      </div>
    </div>

    <div className="w-full  py-6 bg-white flex flex-col gap-12 ">
      <div className="max-w-[70rem] m-auto relative  flex flex-col gap-4 items-center justify-center ">

      <div className="font-semibold  m-auto text-xl border-l-[3px]  bg-blue-95 via-transparent bg-opacity-5  px-3 mb-4 border-black">Nos services</div>
      <div className="grid grid-cols-3 gap-2 mx-2 ">
        <div className="border text-center gap-6 py-6 border-neutral-400 p-4 bg-white rounded-lg shadow-md flex flex-col">
{/*           
          <div className="absolute z-10 inset-0 h-full w-full 
          bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] 
          bg-[size:20px_20px]" /> */}
          <h2 className="text-xl font-semibold">Service Familiale</h2>
          <p>Nous vous fournissons des chaises pour enfants de haute qualité. Accompagnement d'un chauffeur pour votre long voyage.</p>
        </div>
        <div className="border text-center gap-6 py-6 border-neutral-400 p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold">Meilleur Prix garanti</h2>
          <p>Nous garantissons les meilleurs prix pour nos offres de location de voiture!</p>
        </div>
        <div className="border text-center gap-6 py-6 border-neutral-400 p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold">Annulation gratuite</h2>
          <p>Annulation sans frais 24 heures avant la location.</p>
        </div>
        <div className="border text-center gap-6 py-6 border-neutral-400 p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold">Livraison & réception</h2>
          <p>Nous offrons un service de livraison et aller, retour dans tous les aéroports du Maroc.</p>
        </div>
        <div className="border text-center gap-6 py-6 border-neutral-400 p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold">Meilleur Prix garanti</h2>
          <p>Nous garantissons les meilleurs prix pour nos offres de location de voiture!</p>
        </div>
        <div className="border text-center gap-6 py-6 border-neutral-400 p-4 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-xl font-semibold">Annulation gratuite</h2>
          <p>Annulation sans frais 24 heures avant la location.</p>
        </div>
      </div>
      </div>
      {/* nos véhicules */}
      <div className="max-w-[70rem] m-auto relative  flex flex-col gap-4 items-center justify-center ">

      <div className="font-semibold  m-auto text-xl border-l-[3px]  bg-blue-95 via-transparent bg-opacity-5  px-3 mb-4 border-black">Nos véhicules</div>
      <div className="grid grid-cols-3 gap-2 mx-2 ">


        <div className="border text-center relative gap-2 border-neutral-400 p-2 bg-white rounded-lg shadow-md flex flex-col">
          <div className="absolute bg-orange-500 px-2 rounded-lg text-white border bg-opacity-65 backdrop-blur-lg border-white top-3 right-3">Louée</div>
          <img 
            className="rounded-lg "
            src={img2}/>
            <div>
              <div className="font-semibold text-lg">Clio 4</div>
              <div className="font-meduim text-lg">Economique</div>      
                <ul className="felx flex-col justify-start text-left mx-2 mt-2 ">
                  <li>5 Sièges</li>
                  <li>4 Ports</li>
                  <li>Essence</li>
                  <li>Automatique</li>
                </ul>
                <div className="p-2 bg-amber-500 rounded-md text-white py-0 my-2 w-fit m-auto font-semibold text-md">300DH</div>
                <div className="bg-neutral-800 text-white p-2 rounded-md">
                  <div>Reserver par:</div>
                  <div className="flex gap-2 w-full mt-2">
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">WhatsApp</button>
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">En ligne</button>
                  </div>
                </div>
            </div>
        </div>

        <div className="border text-center relative gap-2 border-neutral-400 p-2 bg-white rounded-lg shadow-md flex flex-col">
          <div className="absolute bg-orange-500 px-2 rounded-lg text-white border bg-opacity-65 backdrop-blur-lg border-white top-3 right-3">Louée</div>
          <img 
            className="rounded-lg "
            src={img2}/>
            <div>
              <div className="font-semibold text-lg">Clio 4</div>
              <div className="font-meduim text-lg">Economique</div>      
                <ul className="felx flex-col justify-start text-left mx-2 mt-2 ">
                  <li>5 Sièges</li>
                  <li>4 Ports</li>
                  <li>Essence</li>
                  <li>Automatique</li>
                </ul>
                <div className="p-2 bg-amber-500 rounded-md text-white py-0 my-2 w-fit m-auto font-semibold text-md">300DH</div>
                <div className="bg-neutral-800 text-white p-2 rounded-md">
                  <div>Reserver par:</div>
                  <div className="flex gap-2 w-full mt-2">
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">WhatsApp</button>
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">En ligne</button>
                  </div>
                </div>
            </div>
        </div>

        <div className="border text-center relative gap-2 border-neutral-400 p-2 bg-white rounded-lg shadow-md flex flex-col">
          <div className="absolute bg-orange-500 px-2 rounded-lg text-white border bg-opacity-65 backdrop-blur-lg border-white top-3 right-3">Louée</div>
          <img 
            className="rounded-lg "
            src={img2}/>
            <div>
              <div className="font-semibold text-lg">Clio 4</div>
              <div className="font-meduim text-lg">Economique</div>      
                <ul className="felx flex-col justify-start text-left mx-2 mt-2 ">
                  <li>5 Sièges</li>
                  <li>4 Ports</li>
                  <li>Essence</li>
                  <li>Automatique</li>
                </ul>
                <div className="p-2 bg-amber-500 rounded-md text-white py-0 my-2 w-fit m-auto font-semibold text-md">300DH</div>
                <div className="bg-neutral-800 text-white p-2 rounded-md">
                  <div>Reserver par:</div>
                  <div className="flex gap-2 w-full mt-2">
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">WhatsApp</button>
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">En ligne</button>
                  </div>
                </div>
            </div>
        </div>

        <div className="border text-center relative gap-2 border-neutral-400 p-2 bg-white rounded-lg shadow-md flex flex-col">
          <div className="absolute bg-orange-500 px-2 rounded-lg text-white border bg-opacity-65 backdrop-blur-lg border-white top-3 right-3">Louée</div>
          <img 
            className="rounded-lg "
            src={img2}/>
            <div>
              <div className="font-semibold text-lg">Clio 4</div>
              <div className="font-meduim text-lg">Economique</div>      
                <ul className="felx flex-col justify-start text-left mx-2 mt-2 ">
                  <li>5 Sièges</li>
                  <li>4 Ports</li>
                  <li>Essence</li>
                  <li>Automatique</li>
                </ul>
                <div className="p-2 bg-amber-500 rounded-md text-white py-0 my-2 w-fit m-auto font-semibold text-md">300DH</div>
                <div className="bg-neutral-800 text-white p-2 rounded-md">
                  <div>Reserver par:</div>
                  <div className="flex gap-2 w-full mt-2">
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">WhatsApp</button>
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">En ligne</button>
                  </div>
                </div>
            </div>
        </div>

        <div className="border text-center relative gap-2 border-neutral-400 p-2 bg-white rounded-lg shadow-md flex flex-col">
          <div className="absolute bg-orange-500 px-2 rounded-lg text-white border bg-opacity-65 backdrop-blur-lg border-white top-3 right-3">Louée</div>
          <img 
            className="rounded-lg "
            src={img2}/>
            <div>
              <div className="font-semibold text-lg">Clio 4</div>
              <div className="font-meduim text-lg">Economique</div>      
                <ul className="felx flex-col justify-start text-left mx-2 mt-2 ">
                  <li>5 Sièges</li>
                  <li>4 Ports</li>
                  <li>Essence</li>
                  <li>Automatique</li>
                </ul>
                <div className="p-2 bg-amber-500 rounded-md text-white py-0 my-2 w-fit m-auto font-semibold text-md">300DH</div>
                <div className="bg-neutral-800 text-white p-2 rounded-md">
                  <div>Reserver par:</div>
                  <div className="flex gap-2 w-full mt-2">
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">WhatsApp</button>
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">En ligne</button>
                  </div>
                </div>
            </div>
        </div>

        <div className="border text-center relative gap-2 border-neutral-400 p-2 bg-white rounded-lg shadow-md flex flex-col">
          <div className="absolute bg-orange-500 px-2 rounded-lg text-white border bg-opacity-65 backdrop-blur-lg border-white top-3 right-3">Louée</div>
          <img 
            className="rounded-lg "
            src={img2}/>
            <div>
              <div className="font-semibold text-lg">Clio 4</div>
              <div className="font-meduim text-lg">Economique</div>      
                <ul className="felx flex-col justify-start text-left mx-2 mt-2 ">
                  <li>5 Sièges</li>
                  <li>4 Ports</li>
                  <li>Essence</li>
                  <li>Automatique</li>
                </ul>
                <div className="p-2 bg-amber-500 rounded-md text-white py-0 my-2 w-fit m-auto font-semibold text-md">300DH</div>
                <div className="bg-neutral-800 text-white p-2 rounded-md">
                  <div>Reserver par:</div>
                  <div className="flex gap-2 w-full mt-2">
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">WhatsApp</button>
                    <button className="w-full bg-neutral-700 hover:bg-neutral-900 px-2 py-1 rounded border border-neutral-500">En ligne</button>
                  </div>
                </div>
            </div>
        </div>

      </div>
      </div>
    </div>
   </div>
  )
}
