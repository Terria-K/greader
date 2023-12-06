import { writable } from "svelte/store";

export type Todo = {
    id?: string,
    name: string,
    description: string,
    date: string,
    createdAt: number,
    isDone: boolean
}

export const todos = writable<Todo[]>([]);