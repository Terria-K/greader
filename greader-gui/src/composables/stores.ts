import { writable, type Writable } from "svelte/store"

export type Grade = {
    id: string,
    gr: number
}

export const gradeList: Writable<Grade[]> = writable([]);
export const isTauri: boolean = '__TAURI__' in window;