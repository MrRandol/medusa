<script>
import MediaService from '../services/MediaService.js'

export default {
  name: 'MediaList',
  data() {
    return {
      medias: [],
      loading: false,
      error: null,
      mediaService: new MediaService()
    }
  },
  async mounted() {
    await this.loadMedias()
  },
  methods: {
    async loadMedias() {
      try {
        this.loading = true
        this.error = null
        this.medias = await this.mediaService.getAllMedias()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    getMediaFileUrl(id) {
      return this.mediaService.getMediaFileUrl(id)
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<template>
  <div class="media-list">
    <div v-if="loading" class="loading-message">
      Loading media...
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="loadMedias" class="retry-btn">Retry</button>
    </div>
    
    <div v-if="!loading && !error && medias.length === 0" class="empty-message">
      No media found. Upload your first file above!
    </div>
    
    <div v-if="medias.length > 0" class="media-grid">
      <div v-for="media in medias" :key="media.id" class="media-item">
        <img :src="getMediaFileUrl(media.id)" :alt="media.name" />
        <div class="media-info">
          <p class="media-name">{{ media.name }}</p>
          <p class="media-date">{{ formatDate(media.imported_at) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-list {
  width: 100%;
}

.loading-message,
.error-message,
.empty-message {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.error-message {
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.retry-btn {
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
}

.media-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.media-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.media-info {
  padding: 1rem;
  background: white;
}

.media-name {
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.media-date {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
}
</style>