<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { auth, db } from "$lib/firebase";
    import { getDoc, doc, setDoc } from "firebase/firestore";
    import { authHandlers, authStore } from "../store/store";
    import "../app.css";

    //const nonAuthRoutes = ["/register", "/login", "/"];

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const currentPath = window.location.pathname;

            console.log(user);

            if(user && currentPath === "/register" || user && currentPath === "/login"){
                window.location.href = "/";
                return;
            }

            /*
            let dataToSetToStore;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                console.log("Creating User");
                const userRef = doc(db, "users", user.uid);
                //SETUP THIS STORE!!!!!!!!
                dataToSetToStore = {
                    email: user.email,
                    subscription: "New User" //Could Be Paid, unpaid, canceled, ect
                };
                await setDoc(userRef, dataToSetToStore, { merge: true });
            } else {
                console.log("Fetching User");
                const userData = docSnap.data();
                dataToSetToStore = userData;
            }

            authStore.update((curr) => {
                return {
                    ...curr,
                    user,
                    data: dataToSetToStore,
                    loading: false,
                };
            });
            */
        });
        return unsubscribe;
    });

</script>
  
<slot />

