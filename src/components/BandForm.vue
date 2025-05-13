<template>
  <form @submit.prevent="handleSubmit" class="band-form">
    <h2 class="form-title">Band Info Submission</h2>

    <div>
      <label>Name:</label>
      <input v-model="form.name" type="text" required />
    </div>

    <div>
      <label>Band:</label>
      <textarea
        v-model="form.band"
        required
        placeholder="Your favorite music band + a few words explaining why you chose them."
      />
    </div>

    <div>
      <label>Year:</label>
      <select v-model="form.year" required>
        <option disabled value="">Select a year</option>
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <div>
      <label>API Key (Optional):</label>
      <input
        v-model="form.apiKey"
        type="password"
        placeholder="Enter your LLM API Key (optional)"
      />
      <div v-if="!form.apiKey" style="color: red; font-size: 0.9rem">
        Generative features (text & image) will be skipped without an API key.
      </div>
    </div>

    <button type="submit">Let’s get rolling</button>
  </form>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  initialData: Object,
});
const emit = defineEmits(["submit-form"]);

const form = reactive({
  name: "",
  band: "",
  year: "",
  apiKey: "",
});

const years = [];
for (let y = 1960; y <= 2025; y++) {
  years.push(y);
}

watch(
  () => props.initialData,
  (data) => {
    if (data) {
      form.name = data.name || "";
      form.band = data.band || "";
      form.year = data.year || "";
      form.apiKey = data.apiKey || "";
    }
  },
  { immediate: true }
);

function handleSubmit() {
  emit("submit-form", { ...form });
}
</script>

<style scoped>
.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: #222;
}

.band-form {
  width: 600px;
  max-width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

.band-form div {
  display: flex;
  flex-direction: column;
}

.band-form label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #333;
}

.band-form input,
.band-form textarea,
.band-form select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
}

.band-form button {
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.band-form button:hover {
  background-color: #45a049;
}
</style>
