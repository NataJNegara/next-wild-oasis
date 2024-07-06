import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function Cabin({ cabin }) {
  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative scale-[1.15] -translate-x-3">
        <Image
          fill
          quality={70}
          src={cabin.image}
          alt={`Cabin ${cabin.name}`}
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
          Cabin {cabin.name}
        </h3>

        <p className="mb-10 text-lg text-primary-300">
          <TextExpander>{cabin.description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex items-center gap-3">
            <UsersIcon className="w-5 h-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
              guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="w-5 h-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="w-5 h-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
