'use client'

import { useRouter } from "next/navigation";

export function TopNav() {

    const router = useRouter();

    return (
        <div className="px-4 py-3 text-white mx-auto">
            <div className="flex justify-end space-x-4">
                <a href="" className="text-sm uppercase tracking-wider hover:bg-indigo-300" onClick={() => router.push("login")}>Login</a>
                <a href="" className="text-sm uppercase tracking-wider hover:bg-indigo-300" onClick={() => router.push("register")}>Register</a>
            </div>
        </div>
    );
}