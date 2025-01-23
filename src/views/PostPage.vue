<template>
  <div class="p-6">
    <div class="space-y-4">
      <div v-if="loading" class="text-center py-4">
        <p>Yükleniyor...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-600 text-center py-4">
        {{ error }}
      </div>

      <!-- Posts List -->
      <template v-else>
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white rounded-lg shadow p-4"
        >
          <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-600 mb-4">{{ post.body }}</p>
          <div class="flex justify-end">
            <button
              @click="openPostDetail(post.id)"
              class="text-black-600 hover:text-black-800 flex items-center"
            >
              See More
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
                <path d="M12 16l4 -4l-4 -4"></path>
                <path d="M8 12h8"></path>
                <path
                  d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </template>
    </div>

    <Teleport to="body">
      <div
        v-if="selectedPost"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closePostDetail"
        ></div>

        <!-- Modal İçeriği -->
        <div
          class="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4"
        >
          <!-- Header - Sabit kalacak -->
          <div class="p-6 border-b">
            <h2 class="text-xl font-semibold pr-8">{{ selectedPost.title }}</h2>
            <!-- Close Button - Sabit kalacak -->
            <button
              @click="closePostDetail"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <!-- İki Sütunlu İçerik -->
          <div class="flex">
            <!-- Sol Sütun - Post İçeriği -->
            <div class="w-1/2 p-6 border-r">
              <div class="space-y-4">
                <div class="pb-4">
                  <p class="text-gray-800">{{ selectedPost.body }}</p>
                </div>
              </div>
            </div>

            <!-- Sağ Sütun - Yorumlar -->
            <div class="w-1/2 p-6">
              <h3 class="text-lg font-semibold mb-4">Comments</h3>
              <div class="space-y-4 comments-section">
                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="flex items-start space-x-3 pb-4"
                >
                  <div class="flex-shrink-0">
                    <img
                      :src="getAvatarUrl(comment.email)"
                      class="w-8 h-8 rounded-full"
                      :alt="`${comment.name}'s avatar`"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold">{{ comment.name }}</p>
                    <p class="text-gray-600 text-sm">{{ comment.body }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { postService } from "../services/api";

export default {
  name: "PostsList",
  data() {
    return {
      posts: [],
      selectedPost: null,
      comments: [],
      loading: true,
      loadingComments: false,
      error: null,
    };
  },
  methods: {
    getAvatarUrl(email) {
      return postService.getAvatar(email);
    },
    async openPostDetail(postId) {
      this.loadingComments = true;
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          postService.getPost(postId),
          postService.getPostComments(postId),
        ]);

        this.selectedPost = postResponse.data;
        this.comments = commentsResponse.data;
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        this.loadingComments = false;
      }
    },
    closePostDetail() {
      this.selectedPost = null;
      this.comments = [];
    },
  },
  watch: {
    selectedPost(newVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
  async created() {
    try {
      const response = await postService.getPosts();
      this.posts = response.data;
    } catch (error) {
      this.error = "Postlar yüklenirken bir hata oluştu.";
      console.error("Error fetching posts:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.bg-white {
  border-radius: 8px;
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.comments-section {
  max-height: calc(100vh - 250px);
  overflow-y: auto;
}

.comments-section::-webkit-scrollbar {
  width: 6px;
}

.comments-section::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.comments-section::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}
</style>
