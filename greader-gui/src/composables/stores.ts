import { writable, type Writable } from "svelte/store"

export type Grade = {
    id: string,
    gr: number
}

export const gradeList: Writable<Grade[]> = writable([]);
export const student : Writable<Students|null> = writable(null);
export const students : Writable<Students[]> = writable([]);
export const studentsRefreshed: Writable<boolean> = writable(false);
export const isTauri: boolean = '__TAURI__' in window;

export type Students = {
    id?: string,
    name: string,
    usn: string,
    subjects: SubjectsCollection[],
    course: string
}

export type SubjectsCollection = {
    activityScore: Map<string, number>;
    subject: SubjectType;
}

export type SubjectType = {
    id: string,
    name: string,
    formula: "Basic" | "Percentage" | "Customized",
    script: string,
    categories: { [key: string]: Category }
}

export type Category = {
    percentage: number
    activities: Activity[]
}

export type Activity = {
    name: string,
    maxScore: number,
}