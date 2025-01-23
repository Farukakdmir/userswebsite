<template>
  <div class="flex bg-gray-100 min-h-screen font-poppins">
    <NavbarMain v-if="$route.name === 'home'" />

    <NavbarSecond
      v-else
      :userId="currentUserId"
      :userName="currentUser?.name"
      :userEmail="currentUser?.email"
      :userImage="null"
    />

    <div class="flex-grow p-10 ml-64">
      <router-view v-slot="{ Component }">
        <component :is="Component" :users="users" />
      </router-view>
    </div>
  </div>
</template>

<script>
import NavbarMain from "./components/NavbarMain.vue";
import NavbarSecond from "./components/NavbarSecond.vue";
import { ref, computed, onMounted } from "vue";
import { userService } from "../src/services/api";

export default {
  name: "App",
  components: {
    NavbarMain,
    NavbarSecond,
  },
  setup() {
    const users = ref([]);
    const currentUser = ref(null);

    const currentUserId = computed(() => {
      return currentUser.value?.id;
    });

    const fetchUser = async (userId) => {
      try {
        const response = await userService.getUser(userId);
        currentUser.value = response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    onMounted(async () => {
      try {
        const response = await userService.getUsers();
        users.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    });

    return {
      users,
      currentUser,
      currentUserId,
      fetchUser,
    };
  },
  watch: {
    $route(to) {
      if (to.params.userId) {
        this.fetchUser(to.params.userId);
      }
    },
  },
};
</script>
