<script>
    //@ts-nocheck
    import { Input } from "$lib/components/shadcn/ui/input/index";
    import { authHandlers } from "../../store/store";
    import { Checkbox } from "$lib/components/shadcn/ui/checkbox/index";
    import { Label } from "$lib/components/shadcn/ui/label/index";
    import * as Select from "$lib/components/shadcn/ui/select";

    let name = null;
    let email = null;
    let pass = null;
    let classInput = null;
    let bio = null;
    let loading = false;

    let step = 1;

    let selectedClasses = [];
    let transcriptFiles = [];
    let profilePicBase64 = null;

    const timeOptions = ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm","8pm", "9pm", "10pm", "11pm",];

    const handleNext = async () => {
      if ((step === 1 && !name) || (step === 1 && !email) || (step === 1 && !pass)) {
        alert("Please fill in all the fields before continuing.");
        return;
      }

      if ((step === 2 && selectedClasses.length === 0) || (step === 2 && !bio)) {
        alert("Please fill in all the fields before continuing.");
        return;
      }

      if (step === 3 && transcriptFiles.length === 0) {
        alert("Please fill in all the fields before continuing.");
        return;
      }

      if (step === 5 && !profilePicBase64) {
        alert("Please fill in all the fields before continuing.");
        return;
      }

      if(step === 5){
        await authHandlers.tutorSignup(name, email, pass, selectedClasses, bio, transcriptFiles);
        window.location.href = "/dashboard";
      }

      step++;
    }

    const handleLogin = async () => {
        try {
            authHandlers.signup(email, pass);
        } catch (error) {
            console.log("There was an error:", error);
        }
    };

    const addClass = () => {
      selectedClasses.push(classInput);
      selectedClasses = selectedClasses;
      classInput = "";
    }

    const handleTranscriptUpload = (event) =>{
        loading = true;

        setTimeout(()=>{
          loading = false;
        }, 3000)

        transcriptFiles.push(event.target.files[0].name);
        transcriptFiles = transcriptFiles;
        console.log(transcriptFiles);
    }

    const handleProfilePicUpload = (event) => {
      const file = event.target.files[0];

      console.log(event.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        profilePicBase64 = reader.result.split(',')[1];
      };

      reader.readAsDataURL(file);
    }


    //ADD X TO CLASSES
</script>

<div class="w-screen h-screen flex md:bg-gray-200 md:pt-2 md:pb-2.5 md:pr-3">
    <div class="hidden md:flex md:flex-1 h-full justify-center items-center">
      <img class="w-3/5 rounded-2xl" src="https://res.cloudinary.com/tuteria/image/upload/c_fit,h_627,q_80,w_1200/v1/landing_page_images/successful-teacher-2021-09-24-03-01-11-utc.jpg" alt="">
    </div>

    <div class="w-full md:w-1/2 lg:w-2/5 h-full rounded-xl bg-white m-0 p-0">
        <div class="flex min-h-full flex-col px-6 justify-center lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <!--<img class="mx-auto h-12 w-auto" src="" alt="Court Grabber Offical Logo">-->
              <h2 class="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Register As A Tutor</h2>
              <p class="text-gray-400 mt-1 text-center mb-7 md:mb-9">Please fill out the details below</p> <!--Placeholder helper text-->
            </div>
          
            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST">
                {#if step === 1}
                  <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                      <Input bind:value={name} type="name" placeholder="Name" />
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                      <Input bind:value={email} type="email" placeholder="Email" />
                    </div>
                  </div>
            
                  <div>
                    <div class="flex items-center justify-between">
                      <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                      <div class="text-sm">
                        <a href="#" class="font-semibold text-blue hover:text-green-700">Forgot password?</a>
                      </div>
                    </div>
                    <div class="mt-2">
                      <Input bind:value={pass} type="password" placeholder="Password" />
                    </div>
                  </div>
                {:else if step === 2}
                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">What classes would you like to teach?</label>

                    <div class="mt-1 mb-4 flex gap-2">
                      {#each selectedClasses as selectedClass}
                        <p class="text-sm py-2.5 px-3 w-fit border-gray-200 border rounded-xl">{selectedClass}</p>
                      {/each}
                    </div>

                    <div class="mt-2">
                      <Input bind:value={classInput} type="email" placeholder="Class" />
                      <button type="button" on:click={addClass}  class="text-blue text-xs font-medium underline mt-2">Add Class</button>
                    </div>

                    <label for="transcriptUpload" class="mb-3 mt-8 block text-sm font-medium leading-6 text-gray-900">Add your bio</label>
                    <Input class="pt-5 pb-16" bind:value={bio} type="email" placeholder="Hi, I'm ..." />
                  </div>
                {:else if step === 3}
                  <div>
                    <label for="transcriptUpload" class="block text-sm font-medium leading-6 text-gray-900">Please upload any related transcripts</label>
                    <div class="mt-4 flex items-center justify-center w-full">
                      <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div class="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                          </div>
                          <input on:change={handleTranscriptUpload} id="dropzone-file" type="file" class="hidden" />
                      </label>
                    </div> 

                    <div class="mt-6 flex flex-col gap-3">
                      {#each transcriptFiles as file}
                        <div class="w-full bg-white py-2 px-4 rounded-md border border-gray-300 flex justify-between items-center">
                          <div class="flex items-center gap-3">
                            <img class="w-8 p-1.5 bg-blue-100 rounded-md" src="https://img.icons8.com/material-rounded/100/2563EB/image.png" alt="">
                            <p class="text-sm">{file.length > 10 ? `${file.slice(0,8)}... ${file.slice(file.lastIndexOf(".") + 1)}` : ""}</p> <!--{-->
                          </div>
                          <img class="h-6 cursor-pointer" src="https://img.icons8.com/ios-filled/50/multiply.png" alt="">
                        </div>
                      {/each}
                    </div>

                  </div>
                {:else if step === 4}
                  <div>
                    <label for="transcriptUpload" class="block text-sm font-medium leading-6 text-gray-900">Please add your availability</label>

                    <div class="flex flex-col gap-2">
                      <div class="mt-3 flex items-center space-x-2">
                        <Checkbox id="terms" aria-labelledby="terms-label" />
                        <Label id="terms-label" for="terms" class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <p class="mr-4">Sunday</p>

                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                              <Select.Content>
                                {#each timeOptions as option}
                                  <Select.Item value={option}>{option}</Select.Item>
                                {/each}
                              </Select.Content>
                          </Select.Root>
                          <p class="mx-3">-</p>
                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Label>
                      </div>

                      <div class="mt-3 flex items-center space-x-2">
                        <Checkbox id="terms" aria-labelledby="terms-label" />
                        <Label id="terms-label" for="terms" class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <p class="mr-4">Monday</p>

                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <p class="mx-3">-</p>
                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Label>
                      </div>

                      <div class="mt-3 flex items-center space-x-2">
                        <Checkbox id="terms" aria-labelledby="terms-label" />
                        <Label id="terms-label" for="terms" class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <p class="mr-4">Tuesday</p>

                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <p class="mx-3">-</p>
                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Label>
                      </div>

                      <div class="mt-3 flex items-center space-x-2">
                        <Checkbox id="terms" aria-labelledby="terms-label" />
                        <Label id="terms-label" for="terms" class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <p class="mr-4">Wednesday</p>

                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <p class="mx-3">-</p>
                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Label>
                      </div>

                      <div class="mt-3 flex items-center space-x-2">
                        <Checkbox id="terms" aria-labelledby="terms-label" />
                        <Label id="terms-label" for="terms" class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <p class="mr-4">Thursday</p>

                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <p class="mx-3">-</p>
                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Label>
                      </div>

                      <div class="mt-3 flex items-center space-x-2">
                        <Checkbox id="terms" aria-labelledby="terms-label" />
                        <Label id="terms-label" for="terms" class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <p class="mr-4">Friday</p>

                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <p class="mx-3">-</p>
                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Label>
                      </div>

                      <div class="mt-3 flex items-center space-x-2">
                        <Checkbox id="terms" aria-labelledby="terms-label" />
                        <Label id="terms-label" for="terms" class="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          <p class="mr-4">Saturday</p>

                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                          <p class="mx-3">-</p>
                          <Select.Root>
                            <Select.Trigger class="w-full">
                              <Select.Value placeholder="Time" />
                            </Select.Trigger>
                            <Select.Content>
                              {#each timeOptions as option}
                                <Select.Item value={option}>{option}</Select.Item>
                              {/each}
                            </Select.Content>
                          </Select.Root>
                        </Label>
                      </div>
                  </div>

                  </div>
                {:else if step === 5}
                  <div class="flex flex-col items-center">
                    <div class="bg-gray-500 h-[200px] w-[200px] rounded-full">
                      {#if profilePicBase64}
                        <img class="w-full h-full rounded-full object-cover" src={`data:image/png;base64,${profilePicBase64}`} alt="Profile Pic">
                      {/if}
                    </div>

                    <div class="mt-14 w-full">
                      <label for="profilePicUpload" class="mb-2 block text-sm font-medium leading-6 text-gray-900">Please upload your profile photo</label>
                      <input on:change={handleProfilePicUpload} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
                    </div>
                  </div>
                {/if}
                  <div>
                    <button on:click={handleNext} type="button" class="mt-10 flex w-full justify-center rounded-md btn-blue px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Next</button>
                  </div>
              </form>
          
              <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <a href="/register" class="font-semibold leading-6 text-blue hover:text-green-700">Join our community today</a>
              </p>
            </div>
          </div>
      </div>
</div>

<style>
    .text-blue{
        color: #189282;
    }

    .btn-blue{
        background: #189282;
    }
</style>