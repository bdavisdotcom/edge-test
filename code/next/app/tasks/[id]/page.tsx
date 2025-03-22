"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "@/components/user-context";
import { getSession } from "@/lib/session";

export default function Task() {
    const { id } = useParams<{ id: string }>();
    const { currentUser } = useUserContext();
    const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      return router.push("/");
    }
  }, []);

    return <div>TASK {id}</div>
}