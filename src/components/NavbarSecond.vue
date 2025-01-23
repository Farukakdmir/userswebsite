<template>
  <nav
    class="bg-white w-64 py-8 h-full fixed shadow-md flex flex-col justify-between font-poppins"
  >
    <!-- Üst Kısım - Kullanıcı Bilgileri -->
    <div>
      <div class="flex items-center space-x-4">
        <img
          :src="userImage || '/assets/users.png'"
          alt="User Image"
          class="w-16 h-16 rounded-full"
        />
        <div class="flex flex-col">
          <h2 class="text-lg font-semibold text-gray-800">
            {{ userName || "Jane Doe" }}
          </h2>
          <p class="text-sm text-gray-600">
            {{ userEmail || "jane@lorem.com" }}
          </p>
        </div>
      </div>

      <!-- Menü Öğeleri -->
      <div class="mb-4 pt-20">
        <ul>
          <li class="mb-3">
            <router-link
              :to="`/todos/${userId}`"
              class="flex items-center text-gray-700 transition pl-4 py-2 relative"
              :class="{ 'bg-purple-50': $route.path.includes('/todos') }"
            >
              <div
                class="absolute left-0 top-0 w-1 h-full bg-purple-600 rounded-r"
                v-if="$route.path.includes('/todos')"
              ></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="24"
                height="24"
                stroke-width="2"
                class="text-gray-700 mr-2"
              >
                <path
                  d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
                ></path>
                <path
                  d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
                ></path>
                <path d="M9 14h.01"></path>
                <path d="M9 17h.01"></path>
                <path d="M12 16l1 1l3 -3"></path>
              </svg>
              <span class="ml-2">Todos</span>
            </router-link>
          </li>

          <li class="mb-2">
            <router-link
              :to="`/posts/${userId}`"
              class="flex items-center text-gray-700 transition pl-4 py-2 relative"
              :class="{ 'bg-purple-50': $route.path.includes('/posts') }"
            >
              <div
                class="absolute left-0 top-0 w-1 h-full bg-purple-600 rounded-r"
                v-if="$route.path.includes('/posts')"
              ></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="24"
                height="24"
                stroke-width="2"
                class="text-gray-700 mr-2"
              >
                <path
                  d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"
                ></path>
                <path d="M13 8l2 0"></path>
                <path d="M13 12l2 0"></path>
              </svg>
              <span class="ml-2">Posts</span>
            </router-link>
          </li>

          <li class="mb-2">
            <router-link
              :to="`/albums/${userId}`"
              class="flex items-center text-gray-700 transition pl-4 py-2 relative"
              :class="{ 'bg-purple-50': $route.path.includes('/albums') }"
            >
              <div
                class="absolute left-0 top-0 w-1 h-full bg-purple-600 rounded-r"
                v-if="$route.path.includes('/albums')"
              ></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="24"
                height="24"
                stroke-width="2"
                class="text-gray-700 mr-2"
              >
                <path d="M15 8h.01"></path>
                <path
                  d="M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5"
                ></path>
                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l1.5 1.5"></path>
                <path
                  d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z"
                ></path>
              </svg>
              <span class="ml-2">Albums</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Alt Kısım - Logo -->
    <div class="flex items-center justify-center mb-4">
      <img src="/assets/logo.png" alt="Logo" class="w-12 h-12" />
      <span class="text-gray-700 text-lg ml-2">N2Mobil</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    userId: {
      type: [String, Number],
      default: null,
    },
    userName: {
      type: String,
      default: null,
    },
    userEmail: {
      type: String,
      default: null,
    },
    userImage: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.visible {
  visibility: visible;
}

.router-link-active {
  color: #7c3aed;
  background-color: #bdbdbddf;
}
</style>
