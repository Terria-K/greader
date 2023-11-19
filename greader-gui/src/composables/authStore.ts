import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, type User } from "firebase/auth";
import { writable } from "svelte/store";
import { AuthApp } from "../firebase";

export type AuthUser = {
    isLoading: boolean,
    currentUser: User | null
}

export const authStore = writable<AuthUser>({
    isLoading: true,
    currentUser: null
});

export const authHandlers = {
    signup: async (email: string, password: string) => {
        await createUserWithEmailAndPassword(AuthApp, email, password);
    },
    logout: async () => {
        await signOut(AuthApp);
    },
    login: async (email: string, password: string) => {
        await signInWithEmailAndPassword(AuthApp, email, password);
    },
    resetPassword: async (email: string) => {
        await sendPasswordResetEmail(AuthApp, email);
    },
    updateEmail: async (email: string) => {
        if (AuthApp.currentUser) {
            await updateEmail(AuthApp.currentUser, email);
        }
    },
    updatePassword: async (password: string) => {
        if (AuthApp.currentUser) {
            await updatePassword(AuthApp.currentUser, password);
        }
    }
}