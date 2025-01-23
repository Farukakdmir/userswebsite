<template>
  <div class="p-6">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <p>Fotoğraflar yükleniyor...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-600 text-center py-4">
      {{ error }}
    </div>

    <!-- Album Content -->
    <div v-else>
      <!-- Back Button -->
      <router-link
        :to="{ name: 'albums', params: { userId: userId } }"
        class="inline-flex items-center mb-6 text-gray-600 hover:text-gray-800"
      >
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
          <path d="M12 8l-4 4l4 4"></path>
          <path d="M16 12h-8"></path>
          <path
            d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
          ></path>
        </svg>
        Geri Dön
      </router-link>

      <!-- Album Title -->
      <h1 class="text-2xl font-bold mb-6">{{ album?.title }}</h1>

      <!-- Photos Grid -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        >
          <img
            :src="photo.url"
            :alt="photo.alt"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"
          >
            <div
              class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            >
              <p class="text-sm">Fotoğraf {{ index + 1 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { albumService } from "../services/api";

export default {
  name: "AlbumDetailView",
  props: {
    userId: {
      type: String,
      required: true,
    },
    albumId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      album: null,
      photos: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        // Albüm bilgilerini al
        const albumResponse = await albumService.getAlbum(this.albumId);
        this.album = albumResponse.data;

        // Picsum API'den rastgele fotoğraflar oluştur
        this.photos = Array.from({ length: 12 }, (_, index) => ({
          url: `https://picsum.photos/seed/album${this.albumId}_photo${index}/400/400`,
          alt: `Fotoğraf ${index + 1}`,
        }));
      } catch (error) {
        this.error = "Albüm detayları yüklenirken bir hata oluştu.";
        console.error("Error fetching album details:", error);
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
