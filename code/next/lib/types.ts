export type Task = {
    id: string;
    priority: number;
    status: string;
    due_date: Date;
    title: string;
    description: string;
    updated_at: Date;
    created_at: Date;
};

export type User = {
    id: number;
    name: string;
    email: string;
    created_at: number;
    updated_at: number;
}