<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { auth, db } from "$lib/firebase";
    import { getDoc, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
    import { authHandlers, authStore } from "../store/store";
    import "../app.css";

    //const nonAuthRoutes = ["/register", "/login", "/"];
    //authHandlers.logout();

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const currentPath = window.location.pathname;

            if(user && currentPath === "/register" || user && currentPath === "/login"){
                window.location.href = "/";
                return;
            }

            let dataToSetToStore;

            const usersCollectionRef = collection(db, "users");
            const q = query(usersCollectionRef, where("userId", "==", user.uid));

            try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                console.log(doc.data());
                const userData = doc.data();
                dataToSetToStore = userData;
            } else {
                console.log("No document found with userId '1'");
            }
            } catch (error) {
            console.error("Error getting document:", error);
            }

            authStore.update((curr) => {
                return {
                    ...curr,
                    user,
                    data: dataToSetToStore,
                    loading: false,
                };
            });
        });
        return unsubscribe;
    });

</script>
  
<slot />

