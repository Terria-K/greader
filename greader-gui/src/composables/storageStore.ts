import { StringFormat, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { StorageApp } from '../firebase';
import type { User } from 'firebase/auth';

export const storageHandlers = {
    uploadAvatarURL: async (user: User, image: string) => {
        const reference = ref(StorageApp, "avatars/" + user.uid + ".png");
        await uploadString(reference, image, StringFormat.DATA_URL);
    },
    getAvatarURL: async() => {
        try {
            const reference = ref(StorageApp, "avatars/" + "Screenshot 2023-08-20 171240" + ".png");
            const url = await getDownloadURL(reference);
            return url;
        }
        catch {
            return null;
        }
    }
}