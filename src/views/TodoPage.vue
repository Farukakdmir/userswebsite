<template>
  <div class="p-6">
    <div class="flex items-center mb-6">
      <button
        @click="goBack"
        class="flex items-center text-black-600 hover:text-black-800"
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
        GO HOME
      </button>
    </div>

    <div class="space-y-4">
      <div v-if="loading" class="text-center">Yükleniyor...</div>
      <div v-else-if="error" class="text-red-600">
        {{ error }}
      </div>
      <div
        v-else
        v-for="todo in todos"
        :key="todo.id"
        class="bg-white p-4 rounded-lg"
      >
        <div class="flex items-center">
          <div class="relative flex items-center">
            <input
              type="checkbox"
              v-model="todo.completed"
              @change="updateTodo(todo)"
              class="w-4 h-4 border border-gray-300 rounded appearance-none checked:bg-purple-600 checked:border-purple-600 cursor-pointer focus:outline-none focus:ring-0"
            />
            <svg
              v-if="todo.completed"
              class="absolute w-4 h-4 pointer-events-none text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <span :class="['ml-4', todo.completed ? ' text' : 'text']">
            {{ todo.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userService, todoService } from "../services/api";

export default {
  name: "TodoPage",
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      todos: [],
      user: null,
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const [todosResponse, userResponse] = await Promise.all([
        todoService.getUserTodos(this.userId), // Todo'ları API'den çek
        userService.getUser(this.userId),
      ]);

      const storedTodos =
        JSON.parse(localStorage.getItem(`todos_${this.userId}`)) || {};

      this.todos = todosResponse.data.map((todo) => ({
        ...todo,
        completed:
          storedTodos[todo.id] !== undefined
            ? storedTodos[todo.id]
            : todo.completed,
      }));

      this.user = userResponse.data;
    } catch (err) {
      this.error = "Veriler yüklenirken bir hata oluştu.";
      console.error("Error:", err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    async updateTodo(todo) {
      try {
        const storedTodos =
          JSON.parse(localStorage.getItem(`todos_${this.userId}`)) || {};
        storedTodos[todo.id] = todo.completed;
        localStorage.setItem(
          `todos_${this.userId}`,
          JSON.stringify(storedTodos)
        );

        await todoService.updateTodo(todo.id, { completed: todo.completed }); // Todo'yu güncelle

        console.log("Todo başarıyla güncellendi");
      } catch (error) {
        console.error("Todo güncellenirken hata oluştu:", error);

        const storedTodos =
          JSON.parse(localStorage.getItem(`todos_${this.userId}`)) || {};
        delete storedTodos[todo.id];
        localStorage.setItem(
          `todos_${this.userId}`,
          JSON.stringify(storedTodos)
        );

        todo.completed = !todo.completed;
      }
    },
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  border-color: #1f2937;
  border-width: 2px;
}

input[type="checkbox"]:checked {
  background-image: none;
}

input[type="checkbox"]:focus {
  box-shadow: none;
}
</style>
