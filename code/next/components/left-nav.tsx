'use client'

import { useRouter } from "next/navigation";

export function LeftNav() {

    const router = useRouter();

    return (
        <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full">
            <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
                <li className="py-2 hover:bg-indigo-300 rounded">
                    <a className="truncate" href="" onClick={() => router.push("/")}>
                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg" className="w-7 sm:mx-2 mx-4 inline" />
                        <span className="hidden sm:inline">Home</span>
                    </a>
                </li>
                <li className="py-2 hover:bg-indigo-300 rounded">
                    <a className="truncate" href="" onClick={() => router.push("/profile")}>
                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/user.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Profile</span>
                    </a>
                </li>
                <li className="py-2 hover:bg-indigo-300 rounded">
                    <a className="" href="" onClick={() => router.push("/tasks")}>
                        <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg" className="w-7 sm:mx-2 mx-4 inline" /> <span className="hidden sm:inline">Tasks</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}