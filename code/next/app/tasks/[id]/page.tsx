"use client";
import { useParams } from "next/navigation";

export default function Task() {
    const { id } = useParams<{ id: string }>();

    return <div>TASK {id}</div>
}