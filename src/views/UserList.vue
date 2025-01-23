<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @click="selectUser(user.id)"
    />
  </div>
</template>

<script>
import UserCard from "../components/UserCard.vue";

export default {
  name: "UserList",
  components: {
    UserCard,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectUser(userId) {
      this.$router.push({ name: "todos", params: { userId } });
    },
  },
};
</script>

<style scoped></style>
