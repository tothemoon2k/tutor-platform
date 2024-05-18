//@ts-nocheck
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "$lib/firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { writable } from "svelte/store";
import { auth } from "$lib/firebase";

export const authStore = writable({
    user: null,
    loading: true,
    data: {}
})

export const authHandlers = {
    tutorSignup: async (name, email, pass, selectedClasses, bio, transcriptFiles) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, pass);
            console.log(res, "test");
        
            await setDoc(doc(db, "users", email), {
              name: name,
              userId: res.user.uid,
              email: email,
              selectedClasses: selectedClasses,
              bio: bio,
            });
        
            console.log("User created and document added successfully");
          } catch (error) {
            console.error("Error creating user or adding document:", error);
          }
    },
    login: async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass)
    },
    logout: async () => {
        await signOut(auth)
    }
}