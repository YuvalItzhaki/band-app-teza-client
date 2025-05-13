<template>
  <div v-if="result" class="result-display">
    <h2>Generated Result</h2>

    <div v-if="result.generatedText">
      <h3>Generated Text</h3>
      <p>{{ result.generatedText }}</p>
    </div>

    <div v-if="result.generatedImageUrl">
      <h3>Generated Image</h3>
      <img :src="result.generatedImageUrl" alt="Band Image" />
    </div>

    <div class="stats">
      <h3>Statistics</h3>
      <ul>
        <li>Capitalized Words: {{ result.stats?.capitalWords }}</li>
        <li>Words Followed by Numbers: {{ result.stats?.wordsWithNumbers }}</li>
        <li>Year is: {{ result.isEven ? "Even" : "Odd" }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  result: Object,
});
</script>

<style scoped>
.band-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: Arial, sans-serif;
}

.band-form div {
  display: flex;
  flex-direction: column;
}

.band-form label {
  font-weight: bold;
  margin-bottom: 0.5rem;
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
.result-display {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
  color: #222; /* <-- improve base text color */
}

.result-display h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 1.5rem;
  text-align: center;
}

.result-display h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 1.2rem;
}

.result-display p {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

.stats li {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.stats li:last-child {
  font-weight: bold;
  color: #1e88e5;
}
</style>
