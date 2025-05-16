<template>
  <div class="gallery-container">  
    <h1>Medusa Gallery</h1>
    <!-- Upload Section -->
    <div class="upload-section">
      <MediaUpload @uploaded="onMediaUploaded" />
    </div>
    
    <!-- Gallery Section -->
    <div class="gallery-section">
      <MediaList ref="mediaList" />
    </div>
  </div>
</template>

<script>
import MediaUpload from './MediaUpload.vue'
import MediaList from './MediaList.vue'

export default {
  name: 'MedusaGallery',
  components: {
    MediaUpload,
    MediaList
  },
  methods: {
    onMediaUploaded() {
      // Refresh the media list when a new file is uploaded
      this.$refs.mediaList.loadMedias()
    }
  }
}
</script>

<style scoped>
.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.upload-section {
  border: 1px solid #ccc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.gallery-section {
  min-height: 400px;
}
</style> 