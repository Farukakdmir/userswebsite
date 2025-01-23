<template>
  <div class="p-6">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <p>Albümler yükleniyor...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-600 text-center py-4">
      {{ error }}
    </div>

    <!-- Albums Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="album in userAlbums"
        :key="album.id"
        :to="{
          name: 'album-detail',
          params: {
            userId: userId,
            albumId: album.id,
          },
        }"
        class="album-card bg-white shadow-lg rounded-lg p-6 border border-gray-200"
      >
        <!-- Album Preview -->
        <div class="grid grid-cols-2 gap-2 mb-4">
          <img
            v-for="index in 4"
            :key="index"
            :src="`https://picsum.photos/seed/album${album.id}_${index}/200/200`"
            :alt="`Preview ${index}`"
            class="w-full h-32 object-cover rounded"
          />
        </div>

        <!-- Album Info -->
        <h2 class="text-lg font-semibold text-gray-800 mb-2">
          {{ album.title }}
        </h2>
        <div class="flex items-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M4 8h16M4 16h16"></path>
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { albumService } from "../services/api";

export default {
  name: "AlbumPage",
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userAlbums: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await albumService.getUserAlbums(this.userId);
        this.userAlbums = response.data;
      } catch (error) {
        this.error = "Albümler yüklenirken bir hata oluştu.";
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.album-card {
  transition: transform 0.2s;
}

.album-card:hover {
  transform: scale(1.02);
}
</style>
