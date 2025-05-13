<template>
  <div v-if="latest">
    <h2>Last Submission</h2>
    <p><strong>Name:</strong> {{ latest.name }}</p>
    <p><strong>Band:</strong> {{ latest.band }}</p>
    <p><strong>Year:</strong> {{ latest.year }}</p>
    <p><strong>Content:</strong> {{ latest.content }}</p>
  </div>
  <p v-else>Loading latest submission...</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const latest = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/latest`
    );
    latest.value = res.data;
  } catch (err) {
    console.error("Failed to fetch latest submission:", err);
  }
});
</script>

<style scoped>
h2 {
  margin-bottom: 0.5rem;
}
p {
  margin: 0.25rem 0;
}
</style>
