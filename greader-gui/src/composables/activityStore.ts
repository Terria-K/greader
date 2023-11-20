import { writable } from "svelte/store"

export type Activity = {
    id: string,
    name: string,
    score: number
}

export const activities = writable<Activity[]>([
    {
        id: "$SDKSD",
        name: "Quiz 1",
        score: 90.2
    },
    {
        id: "40234",
        name: "Activtiy 1",
        score: 85.4
    }
])