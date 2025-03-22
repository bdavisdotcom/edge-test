'use client'

import { useRouter } from "next/navigation";
import { useUserContext } from "./user-context";
import { destroySession } from "@/lib/session";

export function TopNav() {
    const { currentUser, setCurrentUser } = useUserContext();
    const router = useRouter();

    function logout() {
        destroySession();
        setCurrentUser(null);
    }

    function NotLoggedIn() {
        return <>
            <a href="" className="text-sm uppercase tracking-wider hover:bg-indigo-300" onClick={() => router.push("login")}>Login</a>
            <a href="" className="text-sm uppercase tracking-wider hover:bg-indigo-300" onClick={() => router.push("register")}>Register</a>
        </>;
    }
    
    function LoggedIn() {
        return <>
            <a href="" className="text-sm uppercase tracking-wider hover:bg-indigo-300" onClick={() => router.push("profile")}>Welcome, {`${currentUser?.name}`}</a>
            <a href="" className="text-sm uppercase tracking-wider hover:bg-indigo-300" onClick={() => logout() }>Logout</a>
        </>;
    }

    return (
        <div className="px-4 py-3 text-white mx-auto">
            <div className="flex justify-end space-x-4">
                {
                    (currentUser && LoggedIn())
                    ||
                    (!currentUser && NotLoggedIn())
                }
            </div>
        </div>
    );
}