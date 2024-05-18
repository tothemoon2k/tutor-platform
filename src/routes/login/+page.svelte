<script>
    import { Input } from "$lib/components/shadcn/ui/input/index";
</script>

<div class="w-screen h-screen flex md:bg-gray-200 md:pt-2 md:pb-2.5 md:pr-3">
    <div class="hidden md:flex md:flex-1 h-full justify-center items-center">
      <img class="w-3/5 rounded-2xl" src="https://res.cloudinary.com/tuteria/image/upload/c_fit,h_627,q_80,w_1200/v1/landing_page_images/successful-teacher-2021-09-24-03-01-11-utc.jpg" alt="">
    </div>

    <div class="w-full md:w-1/2 lg:w-2/5 h-full rounded-xl bg-white m-0 p-0">
        <div class="flex min-h-full flex-col px-6 justify-center lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <!--<img class="mx-auto h-12 w-auto" src="" alt="Court Grabber Offical Logo">-->
              <h2 class="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Welcome back!</h2>
              <p class="text-gray-400 mt-1 text-center mb-7 md:mb-9">Please enter your details</p> <!--Placeholder helper text-->
            </div>
          
            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST">
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div class="mt-2">
                    <Input type="email" placeholder="Email" />
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
                    <Input type="password" placeholder="Password" />
                  </div>
                </div>
          
                <div>
                  <button type="button" class="mt-10 flex w-full justify-center rounded-md btn-blue px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
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