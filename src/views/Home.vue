<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-black-600">All Users</h1>
    <UserList v-if="users" :users="users" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import UserList from "../views/UserList.vue";

export default {
  name: "Home",
  components: {
    UserList,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
