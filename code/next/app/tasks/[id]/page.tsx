"use client";
import { useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserContext } from "@/components/user-context";
import { getSession } from "@/lib/session";

export default function Task() {
    const { id } = useParams<{ id: string }>();
    const { currentUser } = useContext(UserContext);
    const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      return router.push("/");
    }
  }, []);

    return <div>TASK {id}</div>
}