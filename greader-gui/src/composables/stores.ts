import { writable, type Writable } from "svelte/store"

export type Grade = {
    id: string,
    gr: number
}

export const gradeList: Writable<Grade[]> = writable([]);
export const students : Writable<Students[]> = writable([]);
export const studentsRefreshed: Writable<boolean> = writable(false);
export const isTauri: boolean = '__TAURI__' in window;

export type Students = {
    id: string,
    name: string,
    usn: string,
    subjects: SubjectsCollection
}

export type SubjectsCollection = {
    activityScore: Map<string, number>;
    subject: Subjects;
}

export type Subjects = {
    id: string,
    name: string,
    activities: any[]
}

export type Activities = {
    maxScore: number,
    percentage: number
}