'use client'

import { useContext } from "react";
import { UserContext } from "./user-context";
import { destroySession } from "@/lib/session";
import { useRouter } from "next/navigation";

export function TopNav() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const router = useRouter();
    function logout() {
        destroySession();
        setCurrentUser(null);
        router.push("/");
    }

    function NotLoggedIn() {
        return <>
            <a href="/login" className="text-sm uppercase tracking-wider hover:bg-indigo-300">Login</a>
            <a href="/register" className="text-sm uppercase tracking-wider hover:bg-indigo-300">Register</a>
        </>;
    }
    
    function LoggedIn() {
        return <>
            <a href="/profile" className="text-sm uppercase tracking-wider hover:bg-indigo-300">Welcome, {`${currentUser?.name}`}</a>
            <a href="/" className="text-sm uppercase tracking-wider hover:bg-indigo-300" onClick={() => logout() }>Logout</a>
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