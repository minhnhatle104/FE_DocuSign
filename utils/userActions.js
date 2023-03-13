import { getFirebaseApp } from "./firebase-config";

export const getUserData = async (userId) => {
    try {
        const app = getFirebaseApp;
        const userRef = doc(db, "users", `users/${userId}`);
        const docSnap  = await getDoc(userRef);
     
        return docSnap.data();
    } catch (error) {
        console.log(error);
    }
}