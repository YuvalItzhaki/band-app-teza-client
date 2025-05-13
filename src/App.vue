<script setup>
import { ref, onMounted } from "vue";
import BandForm from "./components/BandForm.vue";
import ResultDisplay from "./components/ResultDisplay.vue";
import axios from "axios";

// State variables
const submissionResult = ref(null);
const loading = ref(false);
const error = ref("");
const latestSubmission = ref(null);

// Fetch the latest submission from the server
onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:5001/api/latest");
    latestSubmission.value = res.data;
    // Set submission result on page load if data is available
    if (latestSubmission.value) {
      submissionResult.value = latestSubmission.value;
    }
  } catch (err) {
    console.error("Error fetching latest:", err);
  }
});

// Handle form submission
async function handleSubmit(formData) {
  loading.value = true;
  error.value = "";
  submissionResult.value = null;

  try {
    const res = await axios.post("http://localhost:5001/api/submit", formData);
    submissionResult.value = res.data;
    // Store the latest data in local storage to persist data across refreshes
    localStorage.setItem("bandSubmission", JSON.stringify(formData));
  } catch (err) {
    console.error("Submission failed:", err);
    error.value = "Something went wrong while generating the content.";
  } finally {
    loading.value = false;
  }
}

// Check if there's stored data on page load
const storedSubmission = localStorage.getItem("bandSubmission");
if (storedSubmission) {
  latestSubmission.value = JSON.parse(storedSubmission);
}
</script>

<template>
  <div class="main-container">
    <!-- BandForm to submit data -->
    <BandForm @submit-form="handleSubmit" :initial-data="latestSubmission" />

    <!-- Feedback area with loading and error messages -->
    <div class="feedback-area">
      <p v-if="loading">Generating response...</p>
      <p v-if="error" class="error">{{ error }}</p>

      <!-- Display result after submission -->
      <ResultDisplay v-if="submissionResult" :result="submissionResult" />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.feedback-area {
  margin-top: 20px;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
