"use client";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "@/lib/types";
import { getSession } from "@/lib/session";

export type UserContextType = {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    
    return context;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        console.log("layout Use effect run...");
        const session = getSession();
        if (!session || currentUser) {
            return;
        }

        console.dir({session, currentUser});

        console.log("*** Load profile from cookie");
        axios.get("/api/user").then((response) => {
            const user = response.data?.user;
            setCurrentUser(user);
        }, (err) => {
            console.log("No user found");
        });
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}