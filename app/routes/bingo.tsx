import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { sha1 } from "js-sha1";
import { Bike, BoomBox, Car, CarFront, Megaphone, Milestone, Mountain, Pause, Plane, Shrub, Siren, Sun, Telescope, Tent, TowerControl, Tractor, TrafficCone, TrainTrack, Utensils, Waves, Wheat } from "lucide-react";
import { useState } from "react";
import { FaBridge, FaCarTunnel, FaFerry, FaMotorcycle } from "react-icons/fa6";
import { IoCarSportSharp, IoFastFoodOutline } from "react-icons/io5";
import { MdLocalGasStation } from "react-icons/md";
import { PiBarnDuotone, PiPoliceCarFill } from "react-icons/pi";
import { TbCamper, TbRollercoaster } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { FaMountainCity } from "react-icons/fa6";


const items = [
  {text: "Utländsk bil", icon: <Car />},
  {text: "Vägkrog", icon: <Utensils />},
  {text: "Boskap", icon: <Plane />},
  {text: "Rastplats", icon:<Pause /> },
  {text: "Vägarbete", icon: <TrafficCone />},
  {text: "Tågövergång", icon: <TrainTrack />},
  {text: "Väderkvarn", icon: <Wheat />},
  {text: "Vattendrag", icon: <Waves />},
  {text: "Camping", icon: <Tent />},
  {text: "Kulle", icon: <Mountain />},
  {text: "Viltskylt", icon: <Milestone />},
  {text: "Parkskylt", icon: <Shrub />},
  {text: "Bro", icon: <FaBridge />},
  {text: "Lastbil", icon: <FaBridge />},
  {text: "Reklam", icon: <Megaphone />},
  {text: "Motor-cykel", icon: <FaMotorcycle />},
  {text: "Polisbil", icon: <PiPoliceCarFill />},
  {text: "Utryckning", icon: <Siren />},
  {text: "Cabriolet", icon: <CarFront />},
  {text: "Husbil", icon: <TbCamper />},
  {text: "Snabbmat", icon: <IoFastFoodOutline />},
  {text: "Utsikt", icon: <Telescope />},
  {text: "Nöjespark", icon: <TbRollercoaster />},
  {text: "Traktor", icon: <Tractor />},
  {text: "Flygplats", icon: <TowerControl />},
  {text: "Tunnel", icon: <FaCarTunnel />},
  {text: "Bensin-station", icon: <MdLocalGasStation />},
  {text: "Färja", icon: <FaFerry />},
  {text: "Solpaneler", icon: <Sun />},
  {text: "Veteranbil", icon: <Car />},
  {text: "Radioreklam", icon: <BoomBox />},
  {text: "Unikt fordon", icon: <IoCarSportSharp />},
  {text: "Cykel", icon: <Bike />},
  {text: "Ladugård", icon: <PiBarnDuotone />},
   {text: "Kommunskylt", icon: <FaMountainCity /> },
];


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function generateBingoGrid(seed: string, numItems: number = 25): { text: string, icon: any }[] {
  // Convert the seed string to a SHA-1 hash
  const hash = sha1(seed);

  // Convert the hash to a list of numbers
  const numbers: number[] = [];
  for (let i = 0; i < hash.length; i += 2) {
    numbers.push(parseInt(hash.slice(i, i + 2), 16));
  }

  // Ensure the numbers are within the range of the items list
  const itemIndices = numbers.map(num => num % items.length);

  // Select a unique set of items based on the indices
  const selectedItems: { text: string, icon: any }[] = [];
  const usedIndices = new Set<number>();

  for (const idx of itemIndices) {
    if (!usedIndices.has(idx) && selectedItems.length < numItems) {
      selectedItems.push(items[idx]);
      usedIndices.add(idx);
    }
  }

  // If there are not enough unique items, fill in with remaining items
  let i = 0;
  while (selectedItems.length < numItems) {
    if (!usedIndices.has(i % items.length)) {
      selectedItems.push(items[i % items.length]);
      usedIndices.add(i % items.length);
    }
    i++;
  }

  return selectedItems;
}


export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const arr = new Array(25).fill(0).map((_, i) => i + 1);
  const url = new URL(request.url);
  const magicword = url.searchParams.get("magicword");
  const bingoSeed = magicword || "default";
  const bingoGrid = generateBingoGrid(bingoSeed);

  return json(
    {
      bingoGrid,
    },
    {
      status: 200,
    },
  );
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  return json(
    {},
    {
      status: 200,
    },
  );
};

export default function Bingo() {
  const [markedItems, setMarkedItems] = useState<string[]>([]);
  const { bingoGrid } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen container flex">
      <div className="m-auto">
        <div className="grid grid-cols-5 gap-1 ">
          {bingoGrid.map((item) => {
            return (
              <div key={item.text}>
              <div
                key={item.text}
                className={cn("border overflow-hidden text-wrap aspect-square rounded-md flex items-center justify-center p-3", markedItems.includes(sha1(item.text)) && "bg-green-400")}
                role="button"
                onClick={() => {
                  if (markedItems.includes(sha1(item.text))) {
                    setMarkedItems(markedItems.filter((i) => i !== sha1(item.text)));
                  } else {
                    setMarkedItems([...markedItems, sha1(item.text)]);
                  }
                }}
              >
                {items.find((i) => i.text === item.text)?.icon || <div/>}
                </div>
                <p className={cn("text-center text-[10px] md:text-sm text-pretty break-words md:break-normal", markedItems.includes(sha1(item.text)) && "text-black")}>{item.text}</p>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <p>"error"</p>;
}
