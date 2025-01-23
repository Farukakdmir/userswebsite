<template>
  <nav
    class="bg-white w-64 py-8 h-full fixed shadow-md flex flex-col justify-between font-poppins"
  >
    <div>
      <div class="mb-4">
        <ul>
          <li class="mb-4 relative">
            <router-link
              to="/"
              class="flex items-center text-gray-700 transition pl-4 relative"
              @click="setActive"
            >
              <div
                class="absolute left-0 top-0 w-1 h-full bg-purple-600 rounded-r"
                :class="{ visible: isActive }"
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
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
              </svg>
              <span
                class="ml-2 text-gray-700"
                :class="{ 'text-purple-600': isActive }"
                >Users</span
              >
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex items-center justify-center mb-4">
      <img src="/assets/logo.png" alt="Logo" class="w-12 h-12" />
      <span class="text-gray-700 text-lg">N2Mobil</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    setActive() {
      this.isActive = true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

.font-poppins {
  font-family: "Poppins", sans-serif;
}

nav {
  background-color: #c3c2c253;
}

nav a {
  text-decoration: none;
}

.absolute {
  left: 0;
}

.visible {
  visibility: visible;
}
</style>
