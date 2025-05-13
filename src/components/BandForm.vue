<template>
  <form @submit.prevent="handleSubmit" class="band-form">
    <h2 class="form-title">Band Info Submission</h2>

    <div>
      <label>Name:</label>
      <input v-model="form.name" type="text" required />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

    <div>
      <label>Band:</label>
      <textarea
        v-model="form.band"
        required
        placeholder="Your favorite music band + a few words explaining why you chose them."
      />
      <span v-if="errors.band" class="error">{{ errors.band }}</span>
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
const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
const bandRegex = /^[a-zA-Z\s.,!?'"-]+$/; // Letters + basic punctuation (no numbers or symbols)

const form = reactive({
  name: "",
  band: "",
  year: "",
  apiKey: "",
});

const errors = reactive({
  name: "",
  band: "",
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

// Simple regex: allow only letters, numbers, spaces
const noSpecialCharsRegex = /^[a-zA-Z0-9\s]+$/;

function handleSubmit() {
  errors.name = "";
  errors.band = "";

  let isValid = true;

  if (!form.name || !nameRegex.test(form.name)) {
    errors.name = "Name must contain only letters and spaces.";
    isValid = false;
  }

  if (!form.band || !bandRegex.test(form.band)) {
    errors.band =
      "Band description must contain only letters and allowed punctuation (no numbers or special symbols).";
    isValid = false;
  }

  if (!form.year) {
    isValid = false;
  }

  if (!isValid) return;

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
.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>
