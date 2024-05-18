<script>
    //@ts-nocheck
    import exampleLogo from "$lib/assets/example-logo.png";
    import * as Avatar from "$lib/components/shadcn/ui/avatar";
    import * as Select from "$lib/components/shadcn/ui/select";
    import { Button } from "$lib/components/shadcn/ui/button";
    import { Label } from "$lib/components/shadcn/ui/label";
    import { collection, query, where, getDocs, updateDoc, doc, onSnapshot, or } from "firebase/firestore";
    import { db } from "$lib/firebase";
    import { authStore } from '../../store/store';

    let lessons = [];

    authStore.subscribe(async (res) => {
        console.log(res.data)

        if (res.data.userId) {
            const lessonsRef = collection(db, "lessons");
            const q = query(lessonsRef,or(where("tutor", "==", res.data.userId),where("student", "==", res.data.userId)));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                lessons.push({ id: doc.id, ...doc.data() });
                console.log({ id: doc.id, ...doc.data() })
            });
        }
    })
</script>


<div>
    <nav class="flex items-center justify-between w-full px-14 border border-[#f0f2f6] border-b">
        <ul class="flex items-center gap-10">
            <li>
                <img class="h-16" src={exampleLogo} alt="Logo">
            </li>
            <li class="flex items-center gap-1.5">
                <img class="h-3.5" src="https://img.icons8.com/ios-filled/50/737373/paper.png" alt="">
                <p class="text-sm font-medium text-gray-500">My Lessons</p>
            </li>
            <li class="flex items-center gap-1.5">
                <img class="h-5" src="https://img.icons8.com/ios-glyphs/50/737373/teacher.png" alt="">
                <p class="text-sm font-medium text-gray-500">My Teachers</p>
            </li>
            <li class="flex items-center gap-2">
                <img class="h-5" src="https://img.icons8.com/ios/50/737373/search--v1.png" alt="">
                <p class="text-sm font-medium text-gray-500">Find Teachers</p>
            </li>
        </ul>

        <div class="flex">
            <Avatar.Root class="scale-90">
                <Avatar.Image src="https://www.charlotte.edu/sites/www.charlotte.edu/files/section/Claudia%20Martinez_980x830.jpg" alt="Avatar" />
                <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
        </div>
    </nav>

    <div class="mt-10 w-5/6 mx-auto">
        <div class="w-full mb-5 flex justify-between items-end">
            <p class="text-2xl font-bold text-[#1a5f8c]">My lessons</p>
            <p class="text-sm font-medium text-[#2f897e]">Show all</p>
        </div>

        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-7">
                {#each Array(5) as _}
                    <div class="border-[#eef0f5] border rounded-xl py-8 px-8 flex">
                        <div class="flex flex-col gap-2 mr-6">
                            <img class="h-[70px] w-[70px] rounded-lg object-cover" src="https://media.cnn.com/api/v1/images/stellar/prod/230317092113-04-black-male-teachers-in-us.jpg?c=original" alt="">
                            <p class="font-bold text-sm">5 <span class="font-normal text-gray-500">lessons</span></p>
                        </div>

                        <div class="flex flex-col w-3/5">
                            <p class="font-semibold text-lg">Johnny Dane</p>
                            <ul class="flex gap-3 text-sm">
                                <li>Chem</li>
                                <li>Bio</li>
                                <li>English</li>
                            </ul>

                            <p class="mt-1 text-sm text-[#7d8798]">Test Bio</p>
                        </div>

                        <div class="flex flex-col flex-1 items-center">
                            <Button class="bg-[#189282]">Join Meeting</Button>
                            <div class="mt-1 mb-2 flex items-center justify-center gap-2 mt-3">
                                <p class="">4.0</p>
                                <div class="flex">
                                    <img class="h-5 w-4.5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                    <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                    <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                    <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                </div>
                            </div>
                            <p class="text-sm text-gray-400 underline">{Math.floor(Math.random() * 20) + 1} reviews</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div> 
</div>