<script setup>
import MedusaGallery from './components/MedusaGallery.vue'
</script>

<template>
  <div>
    <MedusaGallery />
  </div>
</template>

<style>
/* Basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

button {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
}

input, textarea {
  padding: 5px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
}

textarea {
  height: 100px;
}
</style>
