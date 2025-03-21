import { useParams } from "next/navigation";

export function Task() {
    const { id } = useParams<{ id: string }>();

    return <div>TASK {id}</div>
}