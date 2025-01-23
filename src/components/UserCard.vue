<template>
  <div
    class="user-card bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col cursor-pointer"
    @click="goToTodos"
  >
    <div class="flex items-center mb-6">
      <img
        src="/assets/users.png"
        alt="User Image"
        class="w-24 h-24 rounded-full mr-6"
      />
      <div>
        <h2 class="text-lg font-bold text-gray-800">{{ user.name }}</h2>
        <p class="text-gray-600 text-sm">{{ user.email }}</p>
        <p class="text-gray-600 text-sm">{{ user.phone }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div class="flex items-start">
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
        >
          <path d="M15 11a3 3 0 1 0 -3.973 2.839"></path>
          <path
            d="M11.76 21.47a1.991 1.991 0 0 1 -1.173 -.57l-4.244 -4.243a8 8 0 1 1 13.657 -5.588"
          ></path>
          <path
            d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z"
          ></path>
        </svg>
        <div>
          <p class="font-semibold text-gray-800 text-sm">Location</p>
          <p class="text-gray-600 text-sm">
            {{ user.address.street }}, {{ user.address.suite }},
            {{ user.address.city }}
          </p>
        </div>
      </div>

      <div class="flex items-start">
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
        >
          <path d="M3 21l18 0"></path>
          <path d="M5 21v-14l8 -4v18"></path>
          <path d="M19 21v-10l-6 -4"></path>
          <path d="M9 9l0 .01"></path>
          <path d="M9 12l0 .01"></path>
          <path d="M9 15l0 .01"></path>
          <path d="M9 18l0 .01"></path>
        </svg>
        <div>
          <p class="font-semibold text-gray-800 text-sm">Company</p>
          <p class="text-gray-600 text-sm">{{ user.company.name }}</p>
        </div>
      </div>

      <div class="flex items-start">
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
        >
          <path d="M20.94 13.045a9 9 0 1 0 -8.953 7.955"></path>
          <path d="M3.6 9h16.8"></path>
          <path d="M3.6 15h9.4"></path>
          <path d="M11.5 3a17 17 0 0 0 0 18"></path>
          <path d="M12.5 3a16.991 16.991 0 0 1 2.529 10.294"></path>
          <path d="M16 22l5 -5"></path>
          <path d="M21 21.5v-4.5h-4.5"></path>
        </svg>
        <div>
          <p class="font-semibold text-gray-800 text-sm">Website</p>
          <a
            :href="'http://' + user.website"
            class="text-blue-600 hover:underline text-sm"
            target="_blank"
          >
            {{ user.website }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToTodos() {
      this.$router.push(`/todos/${this.user.id}`);
    },
  },
};
</script>

<style scoped>
.user-card {
  width: 360px;
  height: auto;
  transition: transform 0.2s;
}
.user-card:hover {
  transform: scale(1.02);
}
</style>
