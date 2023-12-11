import { writable, type Writable } from "svelte/store";

export type ToastProp = {
    id: number,
    show: boolean,
    title: string,
    content: string,
    isError: boolean,
    close: () => void
}

export const toasts: Writable<ToastProp[]> = writable([]);

let id = 0;

export function error(title: string, content: string, duration: number = 4000) {
    message(title, content, true, duration);
}

export function success(title: string, content: string, duration: number = 4000) {
    message(title, content, false, duration);
}

export function message(title: string, content: string, error: boolean, duration: number = 4000) {
    createToast(title, content, error, duration);
}

function createToast(title: string, content: string, error: boolean, duration: number) {
    const currentID = id;

    const close = (id: number) => {
        setTimeout(() => {
            toasts.update(x => x.filter(x => x.id != id));
        }, 1000);
        toasts.update(x => {
            x = x.map(x => {
                if (x.id == id) {
                    x.show = false;
                }
                return x;
            })
            return x;
        });
    }
    const aTimeout = setTimeout(() => {
        close(currentID);
    }, duration);

    const closeFunc = () => {
        clearTimeout(aTimeout);
        close(currentID);
    };

    const toastProp = {
        show: true,
        close: closeFunc,
        title: title,
        content: content,
        isError: error,
        id: currentID
    };

    toasts.update(x => {
        x.push(toastProp);
        x = x;
        return x;
    });


    id++;
}