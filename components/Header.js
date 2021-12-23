import Image from "next/image";
import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirPlaneIcon,
  MenuIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 py-1 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-5 xl:mx-auto ">
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden cursor-pointer w-36 md:inline-grid"
        >
          <img
            // objectFit="contain"
            layout="fill"
            src="https://boardgamersanonymous.com/wp-content/uploads/2021/05/ig-logo.png"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative w-16 scale-75 cursor-pointer md:hidden"
        >
          <img
            className="object-contain"
            // objectFit="contain"
            layout="fill"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
          />
        </div>
        {/* middle search input*/}
        <div className="hidden max-w-xs md:block">
          <div className="relative mt-1 rounded-md">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="flex-shrink block w-full pl-10 text-sm border-gray-300 rounded-md bg-gray-50 md:text-base focus:border-gray-700 focus:ring-gray-400"
            />
          </div>
        </div>
        {/* right */}
        <div className="flex items-center justify-end space-x-2 md:space-x-3 lg:space-x-6">
          <MenuIcon className="hidden h-6 cursor-pointer" />
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="rotate-45 navBtn" />
                <div className="absolute w-5 h-5 text-sm text-center text-white bg-red-500 rounded-full animate-pulse -top-2 -right-1">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                // src="https://gametapstudios.com/assets/img/azad%20chaiwala.jpg"
                alt="profile pic"
                className="h-10 rounded-full cursor-pointer md:h-10"
              />
            </>
          ) : (
            <button className=" min-w-max" onClick={signIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
