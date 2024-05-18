<script>
    //@ts-nocheck
    import exampleLogo from "$lib/assets/example-logo.png";
    import * as Avatar from "$lib/components/shadcn/ui/avatar";
    import * as Select from "$lib/components/shadcn/ui/select";
    import { Button } from "$lib/components/shadcn/ui/button";
    import { Input } from "$lib/components/shadcn/ui/input";
    import { Label } from "$lib/components/shadcn/ui/label";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/components/shadcn/ui/calendar/index";
    import { collection, query, where, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
    import { db } from "$lib/firebase";
    import { authStore } from '../../store/store';
    
    let storeData = null;
    let yourUserId = null;
    let otherUserId = 2;
    let lastMessageUser = 1;
    let newChatInput = "";
    let allChats = [];
    let chatId = null;
    let selectedChat = 0;
    let selectedChatId = null;
    let messages = [];


    authStore.subscribe(async (res) => {
    storeData = res.data;

    if (res.data.userId) {
        yourUserId = res.data.userId;

        const chatsRef = collection(db, "chats");
        const q = query(chatsRef, where("users", "array-contains", yourUserId));

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            allChats = [];

            querySnapshot.forEach(async (doc) => {
                let data = doc.data();

                data.docId = doc.id;

                console.log(data.users.filter((uid) => uid !== yourUserId)[0]);

                const chatsRef = collection(db, "users");
                const q = query(chatsRef, where("userId", "==", data.users.filter((uid) => uid !== yourUserId)[0]));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        data.otherUser = doc.data();
                        console.log(doc.data());

                        allChats.push(data);
                        allChats = allChats;
                        messages = allChats[selectedChat].messages;
                        otherUserId = allChats[selectedChat].otherUser.userId;
                    });
                });
            });
        });
    }
});

    const otherUser = {
        profilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }

    const yourUser = {
        profilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }

    const sendChat = async () => {
        messages.push({user: yourUserId, content: newChatInput});
        messages = messages;
        newChatInput = "";
        const chatRef = doc(db, "chats", allChats[selectedChat].docId);

        await updateDoc(chatRef, {
            messages: allChats[selectedChat].messages
        });
    }
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

    <div class="h-full w-full flex">
        <div class="w-1/4 h-full border border-l border-[#e6e6e6]">
            <h1 class="flex items-center h-[75px] pl-8 font-semibold text-2xl border-bottom">Messages</h1>

            <div class="py-3 flex flex-col">
                {#each allChats as chat}
                    <div class="px-6 w-full flex justify-between hover:bg-gray-50 py-5 cursor-pointer transition-all">
                        <div class="flex items-center gap-6">
                            <Avatar.Root class="scale-125 rounded-lg">
                                <Avatar.Image src="https://www.charlotte.edu/sites/www.charlotte.edu/files/section/Claudia%20Martinez_980x830.jpg" alt="Avatar" />
                                <Avatar.Fallback>CN</Avatar.Fallback>
                            </Avatar.Root>
            
                            <div>
                                <p class="text-lg font-medium">{chat.otherUser.name}</p>
                                <p class="-mt-1 text-gray-400">{chat.messages[allChats[0].messages.length - 1].content}</p>
                            </div>
                        </div>
        
                        <p class="text-gray-400 font-medium">12m</p>
                    </div>
                {/each}
            </div>
        </div>

        <div class="flex-1 h-[88%] flex flex-col">
            <div class="flex items-center border-bottom h-[75px] px-8 gap-6">
                <Avatar.Root class="h-12 w-12 rounded-lg">
                    <Avatar.Image src="https://www.charlotte.edu/sites/www.charlotte.edu/files/section/Claudia%20Martinez_980x830.jpg" alt="Avatar" />
                    <Avatar.Fallback>CN</Avatar.Fallback>
                </Avatar.Root>

                <div>
                    <p class="text-xl font-medium">Test User</p> <!--{allChats[selectedChat].otherUser.name || ""}-->
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-[#59cd7f] rounded-full"></div>
                        <p>Online</p>
                    </div>
                </div>
                <!--Book a lesson button?-->
            </div>

            <div class="p-10 w-full flex-1 flex flex-col gap-8 overflow-auto" >
                <!-- <div class="flex gap-6 {messages[messages.length - 1].user === 1 ? "absolute right-10" : ""}"> -->
                {#each messages as message}
                    <div class="flex gap-6 {message.user === yourUserId ? "self-end" : ""}">
                        <Avatar.Root class="h-12 w-12 rounded-lg">
                            <Avatar.Image class="object-cover" src={message.user === yourUserId ? yourUser.profilePic : otherUser.profilePic} alt="Avatar" />
                            <Avatar.Fallback>CN</Avatar.Fallback>
                        </Avatar.Root>

                        <div class="flex flex-col gap-4">
                            <p class="bg-gray-100 px-6 py-3 rounded-2xl">{message.content}</p>
                        </div>
                    </div>
                {/each}

                <!--
                <div class="flex gap-6 absolute right-10">
                    <div class="flex flex-col gap-4">
                        <p class="bg-[#4e42ec] text-white px-6 py-3 rounded-2xl">omg, this is amazing</p>
                        <p class="bg-[#4e42ec] text-white px-6 py-3 rounded-2xl">omg, this is amazing</p>
                    </div>

                    <Avatar.Root class="h-12 w-12 rounded-lg">
                        <Avatar.Image src="https://www.charlotte.edu/sites/www.charlotte.edu/files/section/Claudia%20Martinez_980x830.jpg" alt="Avatar" />
                        <Avatar.Fallback>CN</Avatar.Fallback>
                    </Avatar.Root>
                </div>
                -->
            </div>


            <div class="w-full flex justify-center gap-8">
                <Input bind:value={newChatInput} class="py-6 text-base w-3/4" placeholder="Type your message"/>
                <button on:click={sendChat}>
                    <img class="h-9" src="https://img.icons8.com/ios-glyphs/50/4e42ec/filled-sent.png" alt="">
                </button>
            </div>

        </div>
    </div>
</div>

<style>
    .border-bottom{
        border-bottom: 1.5px solid #e6e6e6;
    }
</style>