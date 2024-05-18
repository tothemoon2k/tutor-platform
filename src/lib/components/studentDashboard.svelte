<script>
    //@ts-nocheck
    import exampleLogo from "$lib/assets/example-logo.png";
    import * as Avatar from "$lib/components/shadcn/ui/avatar";
    import * as Select from "$lib/components/shadcn/ui/select";
    import { Button } from "$lib/components/shadcn/ui/button";
    import { Label } from "$lib/components/shadcn/ui/label";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/components/shadcn/ui/calendar/index";
    import { collection, query, where, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
    import { db } from "$lib/firebase";
    import {authStore} from "../../store/store";

    const collectionRef = collection(db, "users");
    let tutorCollection = [];
    let showingModal = false;
    let modalClassValue = null;
    let dateValue = today(getLocalTimeZone());
    let modalTimeValue = null;
    let modalTutorId = null;
    let currUser = null
    let loading = false;

    authStore.subscribe(async (res) => {
        currUser = res.data;
    });


    const getTutors = async () => {
        try {
            const querySnapshot = await getDocs(collectionRef);
            querySnapshot.forEach((doc) => {
                let tutor = doc.data();

                if(tutor.userId !== currUser.userId){
                    tutorCollection.push(tutor);
                }
            });
        } catch (error) {
            console.error("Error getting documents: ", error);
        }

        tutorCollection = tutorCollection;
    }

    const handleBookLesson = async (tutorId) => {
        showingModal = true;
        modalTutorId = tutorId;
    }

    const handleSubmitLesson = async () => {
        console.log(modalClassValue.label, dateValue, modalTimeValue.label);
        console.log(modalTutorId);

        loading = true;

        await addDoc(collection(db, "lessons"), {
            student: currUser.userId,
            tutor: modalTutorId,
            class: modalClassValue.label,
            date: {month: dateValue.month, day: dateValue.day, year: dateValue.year},
            time: modalTimeValue.label
        });

        modalTutorId = null;
        modalClassValue = null;
        dateValue = null;
        modalTimeValue = null;


        setTimeout(()=>{
            loading = false;
            showingModal = false;
        }, 1000)
    }

    getTutors();
</script>

<div class="w-screen h-screen">
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

    <!--Booking Modal-->
    <div class="{!showingModal ? "hidden" : ""} flex justify-center items-center absolute w-screen h-screen bg-gray-600 bg-opacity-25">
        <div class="flex flex-col bg-white w-1/4 pt-6 pb-10 rounded-2xl shadow-lg px-6">
            <h1 class="mb-8 text-2xl font-semibold">Book a lesson</h1>

            <Label class="mb-3" for="class">Select a class</Label>
            <Select.Root bind:selected={modalClassValue}>
                <Select.Trigger class="w-full">
                  <Select.Value placeholder="Class" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="light">AP Chemistry II</Select.Item>
                  <Select.Item value="dark">AP Math II</Select.Item>
                  <Select.Item value="system">AP English II</Select.Item>
                </Select.Content>
            </Select.Root>

            <Label class="mt-8 mb-3" for="email">Select a date</Label>
            <Calendar bind:value={dateValue} class="rounded-md border" />

            <Label class="mt-8 mb-3" for="email">Select a Time</Label>
            <Select.Root bind:selected={modalTimeValue}>
                <Select.Trigger class="w-full">
                  <Select.Value placeholder="Time" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="light">1pm</Select.Item>
                  <Select.Item value="dark">4pm</Select.Item>
                  <Select.Item value="system">5pm</Select.Item>
                </Select.Content>
            </Select.Root>

            <Button on:click={handleSubmitLesson}  class="mt-9 bg-[#189282]">
                {#if !loading}
                    Book a lesson
                {:else}
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                {/if}
            </Button>
        </div>
    </div>

    <div class="mx-auto w-5/6 h-5/6 flex">
        <div class="h-full w-2/5 px-6">
            <div class="w-full pt-8">
                <div class="w-full mb-4 flex justify-between items-end">
                    <p class="text-2xl font-bold text-[#1a5f8c]">My lessons</p>
                    <p class="text-sm font-medium text-[#2f897e]">Show all</p>
                </div>

                <div class="w-full mb-10 bg-[#ecfaf9] py-6 border-2 border-[#d8efee] flex items-center justify-between px-6 rounded-2xl">
                    <div class="flex flex-col items-center w-fit">
                        <p class="">Jan</p>
                        <p class="text-3xl font-semibold">22</p>
                        <p class="">4pm</p>
                    </div>

                    <div class="-mt-2 flex flex-col gap-3 w-fit">
                        <p class="text-white bg-[#16a693] w-fit text-xs font-medium px-2 py-1 rounded-lg">Upcoming</p>
                    
                        <div class="flex gap-3">
                            <img class="h-10 w-10 object-cover rounded-lg" src="https://www.nyit.edu/files/student_resources/StudentResources_Tutoring_Hero.jpg" alt="">

                            <div>
                                <p class="font-medium">Jane Cooper</p>
                                <p class="text-gray-500 text-xs">Chemistry</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4 items">
                        <button class="bg-white border-2 border-gray-200 h-fit w-fit p-1.5 rounded-lg">
                            <img class="h-[20px] w-[20px]" src="https://img.icons8.com/windows/100/278478/info.png" alt="">
                        </button>

                        
                        <Button class="bg-[#189282]">Join Now</Button>
                    </div>
                </div>
            </div>

            <div class="w-full">
                <div class="w-full mb-5 flex justify-between items-end">
                    <p class="text-2xl font-bold text-[#1a5f8c]">My teachers</p>
                    <p class="text-sm font-medium text-[#2f897e]">Show all</p>
                </div>

                <div class="flex flex-col gap-5">
                    {#each Array(3) as _}
                        <div class="rounded-xl border-2 border-[#eef0f5] flex justify-between item-center py-5 px-6">
                            <div class="flex gap-4 items-center">
                                <img class="h-10 rounded-xl" src="https://img.diverseeducation.com/files/base/diverse/all/image/2019/01/edu.Constance_Lindsay_002arw.png?auto=format%2Ccompress&fit=max&q=70&w=400" alt="">

                                <div class="flex flex-col">
                                    <p class="font-medium">Daniella Harris</p>
                                    <p class="text-sm text-gray-400">Math</p>
                                </div>
                            </div>

                            <button class="bg-white border-2 border-[#eef0f5] h-fit w-fit p-2 rounded-lg shadow-md">
                                <img class="h-6" src="https://img.icons8.com/ios-filled/50/1d7c70/more-than.png" alt="">
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="px-7 flex-1 h-full">
            <div class="w-full mb-5 flex justify-between items-end pt-8">
                <p class="text-2xl font-bold text-[#1a5f8c]">Teachers recommended for you</p>
                <p class="text-sm font-medium text-[#2f897e]">Find new matches</p>
            </div>

            <div class="flex flex-col gap-7">
                {#each tutorCollection as tutor}
                    <div class="border-[#eef0f5] border rounded-xl py-8 px-8 flex">
                        <div class="flex flex-col gap-2 mr-6">
                            <img class="h-[70px] w-[70px] rounded-lg object-cover" src="https://media.cnn.com/api/v1/images/stellar/prod/230317092113-04-black-male-teachers-in-us.jpg?c=original" alt="">
                            <p class="font-bold text-sm">{Math.floor(Math.random() * 40) + 1} <span class="font-normal text-gray-500">lessons</span></p>
                        </div>

                        <div class="flex flex-col w-3/5">
                            <p class="font-semibold text-lg">{tutor.name}</p>
                            <ul class="flex gap-3 text-sm">
                                {#each tutor.selectedClasses as selectedClass}
                                    <li>{selectedClass}</li>
                                {/each}
                            </ul>

                            <p class="mt-1 text-sm text-[#7d8798]">{tutor.bio}</p>
                        </div>

                        <div class="flex flex-col flex-1 items-center">
                            <Button on:click={()=>{handleBookLesson(tutor.userId)}} class="bg-[#189282]">Book a lesson</Button>
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