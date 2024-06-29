import { Button } from "@/components/ui/button";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx";
import { sha1 } from "js-sha1";
import { Bike, BoomBox, Car, CarFront, Caravan, Castle, ChevronLeft, CloudRain, Megaphone, Milestone, Mountain, Shrub, Siren, Sun, Telescope, Tent, TowerControl, Tractor, TrafficCone, TrainTrack, Truck, Utensils, Waves } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { FaHatCowboySide } from "react-icons/fa";
import { FaBridge, FaCarTunnel, FaFerry, FaMotorcycle } from "react-icons/fa6";
import { IoCarSportSharp, IoCloudOutline, IoFastFoodOutline } from "react-icons/io5";
import { LuCoffee } from "react-icons/lu";
import { MdLocalGasStation } from "react-icons/md";
import { PiBarnDuotone, PiPoliceCarFill, PiWindmill } from "react-icons/pi";
import { TbCamper, TbRollercoaster } from "react-icons/tb";
import { twMerge } from "tailwind-merge";


const items = [
  {text: "Utländsk bil", icon: <Car className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Vägkrog", icon: <Utensils className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Boskap", icon: <FaHatCowboySide className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Rastplats", icon:<LuCoffee className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" /> },
  {text: "Vägarbete", icon: <TrafficCone className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Tågövergång", icon: <TrainTrack className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Väderkvarn", icon: <PiWindmill className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Vattendrag", icon: <Waves className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Campingplats", icon: <Tent className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Kulle", icon: <Mountain className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Viltskylt", icon: <Milestone className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Parkskylt", icon: <Shrub className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Bro", icon: <FaBridge className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Lastbil", icon: <Truck className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Reklam", icon: <Megaphone className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Motorcykel", icon: <FaMotorcycle className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Polisbil", icon: <PiPoliceCarFill className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Utryckning", icon: <Siren className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Cabriolet", icon: <CarFront className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Husbil", icon: <TbCamper className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Snabbmat", icon: <IoFastFoodOutline className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Utsikt", icon: <Telescope className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Nöjespark", icon: <TbRollercoaster className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Traktor", icon: <Tractor className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Flygplats", icon: <TowerControl className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Tunnel", icon: <FaCarTunnel className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Bensin-station", icon: <MdLocalGasStation className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Färja", icon: <FaFerry className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Solpaneler", icon: <Sun className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Veteranbil", icon: <Car className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Radioreklam", icon: <BoomBox className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Unikt fordon", icon: <IoCarSportSharp className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Cykel", icon: <Bike className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Ladugård", icon: <PiBarnDuotone className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Sevärdhet", icon: <Castle className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Regn", icon: <CloudRain className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Fluffigt moln", icon: <IoCloudOutline className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
  {text: "Husvagn", icon: <Caravan className="text-purple-950 opacity-100 h-7 w-7 md:h-9 md:w-9" />},
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
  const [gradient, setGradient] = useState('');
  const [markedItems, setMarkedItems] = useState<string[]>([]);
  const { bingoGrid } = useLoaderData<typeof loader>();
  const [bgColorClass, setBgColorClass] = useState('');
  const [textColorClasses, setTextColorClass] = useState('');
  const navigate = useNavigate();

   // synchronize initially
   useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    
    const itemString = window.localStorage.getItem("marked-items");
  
    if (!itemString || itemString === "[]") {
      console.log("No marked items found or marked items are empty.");
      return;
    }
    
    const markedItems = JSON.parse(itemString);  
    setMarkedItems(markedItems);
  }, []);

    // synchronize on change
    useEffect(() => {
      window.localStorage.setItem("marked-items", JSON.stringify(markedItems));
    }, [markedItems]);

  useEffect(() => {
    const bgColorClasses = [
      'bg-purple-400',
      'bg-blue-400',
      'bg-red-400',
      'bg-yellow-400',
      'bg-green-400',
      'bg-pink-400',
      'bg-indigo-400',
      'bg-teal-400',
    ];

    const randomColorClass = bgColorClasses[Math.floor(Math.random() * bgColorClasses.length)];
    setBgColorClass(randomColorClass);
  }, []); 

  useEffect(() => {
    const textColorClasses = [
      'text-purple-400',
      'text-pink-400',
    ];

    const randomColorClass = textColorClasses[Math.floor(Math.random() * textColorClasses.length)];
    setTextColorClass(randomColorClass);
  }, []);

  const handleStartOver = () => {
    handleReset();
    navigate("/");
  }

  const handleReset = () => {
    setMarkedItems([]);
  }


  useEffect(() => {
    const gradients = [
      'linear-gradient(to bottom, #ff7e5f, #feb47b)',
      'linear-gradient(to bottom, #6a11cb, #2575fc)',
      'linear-gradient(to bottom, #ff6e7f, #bfe9ff)',
      'linear-gradient(to bottom, #12c2e9, #c471ed, #f64f59)',
      'linear-gradient(to bottom, #667eea, #764ba2)',
      'linear-gradient(to bottom, #ff9a9e, #fecfef)',
      'linear-gradient(to bottom, #a18cd1, #fbc2eb)',
      'linear-gradient(to bottom, #fad0c4, #ffd1ff)',
      'linear-gradient(to bottom, #84fab0, #8fd3f4)',
      'linear-gradient(to bottom, #d4fc79, #96e6a1)',
      'linear-gradient(to bottom, #a6c0fe, #f68084)',
      'linear-gradient(to bottom, #cfd9df, #e2ebf0)',
      'linear-gradient(to bottom, #a1c4fd, #c2e9fb)',
    ];

    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setGradient(randomGradient);
  }, []);

  return (
    <div className="bg-green-300 w-full h-screen" style={{background: gradient}}>
    <div className="h-screen container flex ">
      <div className="m-auto">
      <h1 className={cn(`${textColorClasses} text-center mb-3 text-2xl font-bold tracking-widest`)} style={{fontFamily: "Helvetica Neue, Helvetica, Arial", fontSize: "24px" }}>Roadtrip Bingo 2000</h1>
        <div className="grid grid-cols-5 gap-3">
          {bingoGrid.map((item) => {
            return (
              <div key={item.text}>
              <div
                key={item.text}
                className={cn(
                  `${bgColorClass} transition-all ease-in-out duration-200 bg-opacity-20 border-purple-400 border-1 border-opacity-30 overflow-hidden text-wrap aspect-square rounded-md flex items-center justify-center p-3`,
                  markedItems.includes(sha1(item.text)) && "bg-green-400 border-green-300 border-2 border-opacity-100 bg-opacity-80"
                )}
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
                <p className={cn("text-center text-[10px] md:text-sm text-pretty  md:break-normal", markedItems.includes(sha1(item.text)) && "text-black")}>{item.text}</p>
                
              </div>
            );
          })}
        </div>
    <div className="w-full gap-3 flex">
      <Button onClick={handleStartOver} variant="ghost" size="sm" className="focus:bg-opacity-30 focus:bg-purple-400 hover:bg-purple-500  border-2 border-purple-400 bg-opacity-30 bg-purple-300 border-opacity-30 w-1/2 mt-3 text-xs">
        <ChevronLeft className="w-4 h-4"/>Nytt spel
      </Button>
      <Button onClick={handleReset} variant="ghost" size="sm" className="focus:bg-opacity-30 focus:bg-purple-400 hover:bg-purple-500 border-2 border-purple-400 bg-opacity-30 bg-purple-300 border-opacity-30 w-1/2 mt-3 text-xs">
        <ChevronLeft className="w-4 h-4"/>Nollställ brädet
      </Button>
    </div>
      </div>
    </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <p>"error"</p>;
}
