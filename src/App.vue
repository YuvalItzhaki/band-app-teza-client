<script setup>
import { ref, onMounted } from "vue";
import BandForm from "./components/BandForm.vue";
import ResultDisplay from "./components/ResultDisplay.vue";
import axios from "axios";

const submissionResult = ref(null);
const loading = ref(false);
const error = ref("");
const latestSubmission = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:5001/api/latest");
    latestSubmission.value = res.data;
  } catch (err) {
    console.error("Error fetching latest:", err);
  }
});

async function handleSubmit(formData) {
  loading.value = true;
  error.value = "";
  submissionResult.value = null;

  try {
    const res = await axios.post("http://localhost:5001/api/submit", formData);
    submissionResult.value = res.data;
  } catch (err) {
    console.error("Submission failed:", err);
    error.value = "Something went wrong while generating the content.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="main-container">
    <BandForm @submit-form="handleSubmit" :initial-data="latestSubmission" />

    <div class="feedback-area">
      <p v-if="loading">Generating response...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <ResultDisplay v-if="submissionResult" :result="submissionResult" />
    </div>
  </div>
</template>
