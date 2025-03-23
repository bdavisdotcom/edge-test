'use client'

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./user-context";
import { getSession } from "@/lib/session";

export function LeftNav() {
    const { currentUser } = useContext(UserContext);
    const router = useRouter();

    const session = getSession();

    return (
        <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
                <li className="py-2 hover:bg-indigo-300 rounded" onClick={() => router.push("/")}>
                    <a className="truncate" href="" >
                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg" className="w-7 sm:mx-2 mx-4 inline" />
                        <span className="hidden sm:inline">Home</span>
                    </a>
                </li>
                <li className="py-2 hover:bg-indigo-300 rounded" onClick={(ev) => session ? router.push("/profile") : ev.preventDefault()}>
                    <a className="truncate" href="" >
                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/user.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Profile</span>
                    </a>
                </li>
                <li className="py-2 hover:bg-indigo-300 rounded" onClick={(ev) => session ? router.push("/tasks") : ev.preventDefault()}>
                    <a className="" href="" >
                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Tasks</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}