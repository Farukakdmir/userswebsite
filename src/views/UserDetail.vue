<template>
  <div class="user-detail bg-white shadow-lg rounded-lg p-6 m-4">
    <h2 class="text-2xl font-bold mb-4">{{ user.name }}</h2>
    <p class="text-gray-600">Email: {{ user.email }}</p>
    <p class="text-gray-600">Phone: {{ user.phone }}</p>
    <p class="text-gray-600">
      Website:
      <a :href="user.website" class="text-blue-600 hover:underline">{{
        user.website
      }}</a>
    </p>
    <h3 class="text-lg font-semibold mt-4">Address</h3>
    <p>{{ user.address.street }}, {{ user.address.city }}</p>
    <h3 class="text-lg font-semibold mt-4">Company</h3>
    <p>{{ user.company.name }}</p>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-detail {
  width: 400px;
  transition: transform 0.2s;
}
</style>
