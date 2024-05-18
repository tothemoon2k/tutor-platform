<script>
    import exampleLogo from "$lib/assets/example-logo.png";
    import * as Avatar from "$lib/components/shadcn/ui/avatar";
    import * as Select from "$lib/components/shadcn/ui/select";
    import { Button } from "$lib/components/shadcn/ui/button";
    import { Label } from "$lib/components/shadcn/ui/label";
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/components/shadcn/ui/calendar/index";

    let value = today(getLocalTimeZone());
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
    <div class="flex justify-center items-center absolute w-screen h-screen bg-gray-600 bg-opacity-25">
        <div class="flex flex-col bg-white w-1/4 pt-6 pb-10 rounded-2xl shadow-lg px-6">
            <h1 class="mb-8 text-2xl font-semibold">Book a lesson</h1>

            <Label class="mb-3" for="email">Select a class</Label>
            <Select.Root>
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
              <Calendar bind:value class="rounded-md border" />

              <Button class="mt-9 bg-[#189282]">Book a lesson</Button>
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
                <div class="border-[#eef0f5] border rounded-xl py-8 px-8 flex">
                    <div class="flex flex-col gap-2 mr-6">
                        <img class="h-[70px] w-[70px] rounded-lg object-cover" src="https://media.cnn.com/api/v1/images/stellar/prod/230317092113-04-black-male-teachers-in-us.jpg?c=original" alt="">
                        <p class="font-bold text-sm">32 <span class="font-normal text-gray-500">lessons</span></p>
                    </div>

                    <div class="flex flex-col w-3/5">
                        <p class="font-semibold text-lg">Marquise Edwards</p>
                        <ul class="flex gap-3 text-sm">
                            <li>Chemistry</li>
                            <li>Physics</li>
                            <li>Biology</li>
                        </ul>

                        <p class="mt-1 text-sm text-[#7d8798]">Hi there! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea alias quas accusamus quasi modi repellendus mollitia nulla a ad qui quisquam</p>
                    </div>

                    <div class="flex flex-col flex-1 items-center">
                        <Button class="bg-[#189282]">Book a lesson</Button>
                        <div class="mt-1 mb-2 flex items-center justify-center gap-2 mt-3">
                            <p class="">4.0</p>
                            <div class="flex">
                                <img class="h-5 w-4.5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                            </div>
                        </div>
                        <p class="text-sm text-gray-400 underline">4 reviews</p>
                    </div>
                </div>

                <div class="border-[#eef0f5] border rounded-xl py-8 px-8 flex">
                    <div class="flex flex-col gap-2 mr-6">
                        <img class="h-[70px] w-[70px] rounded-lg object-cover" src="https://media.cnn.com/api/v1/images/stellar/prod/230317092113-04-black-male-teachers-in-us.jpg?c=original" alt="">
                        <p class="font-bold text-sm">32 <span class="font-normal text-gray-500">lessons</span></p>
                    </div>

                    <div class="flex flex-col w-3/5">
                        <p class="font-semibold text-lg">Marquise Edwards</p>
                        <ul class="flex gap-3 text-sm">
                            <li>Chemistry</li>
                            <li>Physics</li>
                            <li>Biology</li>
                        </ul>

                        <p class="mt-1 text-sm text-[#7d8798]">Hi there! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea alias quas accusamus quasi modi repellendus mollitia nulla a ad qui quisquam</p>
                    </div>

                    <div class="flex flex-col flex-1 items-center">
                        <Button class="bg-[#189282]">Book a lesson</Button>
                        <div class="mt-1 mb-2 flex items-center justify-center gap-2 mt-3">
                            <p class="">4.0</p>
                            <div class="flex">
                                <img class="h-5 w-4.5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                                <img class="h-5 w-5" src="https://img.icons8.com/color/48/apple.png" alt="Apple">
                            </div>
                        </div>
                        <p class="text-sm text-gray-400 underline">4 reviews</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>