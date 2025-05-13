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
        <li>
          <strong>Capitalized Words:</strong> {{ result.stats?.capitalWords }}
        </li>
        <li>
          <strong>Words with Numbers:</strong>
          {{ result.stats?.wordsWithNumbers }}
        </li>
        <li><strong>Year is:</strong> {{ result.isEven ? "Even" : "Odd" }}</li>
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
.result-display {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
  color: #222;
  text-align: center;
}

.result-display h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 1.5rem;
}

.result-display h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.result-display p {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  text-align: left;
}

.generated-img {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 1rem;
}

/* Stats Section Styling */
.stats {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.stats ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stats li {
  font-size: 1.1rem;
  color: #444;
  padding: 0.4rem 0;
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
}

.stats li:last-child {
  border-bottom: none;
  font-weight: bold;
  color: #1e88e5;
}
</style>
