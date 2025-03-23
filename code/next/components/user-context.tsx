"use client";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "@/lib/types";
import { destroySession, getSession } from "@/lib/session";

export type UserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const session = getSession();
        if (!session || currentUser) {
            return;
        }

        axios.get("/api/user").then((response) => {
            const user = response.data?.user;
            setCurrentUser(user);
        }, (err) => {
            console.log("No user found");
            setCurrentUser(null);
            destroySession();
        });
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}