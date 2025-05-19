<script>
import MediaService from '../services/MediaService.js'

export default {
  name: 'MediaUpload',
  data() {
    return {
      selectedFile: null,
      uploading: false,
      uploadError: null,
      uploadSuccess: false,
      mediaService: new MediaService()
    }
  },
  methods: {
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0]
      this.uploadSuccess = false
      this.uploadError = null
    },
    
    async uploadFile() {
      try {
        this.uploading = true
        this.uploadError = null
        this.uploadSuccess = false
        
        if (!this.selectedFile) {
          throw new Error('Please select a file')
        }
        
        const formData = new FormData()
        formData.append('file', this.selectedFile)
        
        await this.mediaService.createMedia(formData)
        this.uploadSuccess = true
        this.selectedFile = null
        this.$refs.fileInput.value = ''
        
        // Emit event to parent to refresh media list
        this.$emit('uploaded')
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.uploadSuccess = false
        }, 3000)
        
      } catch (error) {
        this.uploadError = error.message
      } finally {
        this.uploading = false
      }
    },
    
    clearError() {
      this.uploadError = null
    }
  }
}
</script>

<template>
  <div class="media-upload">
    <h2>Upload New Media</h2>
    
    <form @submit.prevent="uploadFile" class="upload-form">
      <div class="file-input-group">
        <input 
          type="file" 
          @change="handleFileSelect" 
          accept="image/*,video/*"
          ref="fileInput"
        />
        <button type="submit" :disabled="!selectedFile || uploading">
          {{ uploading ? 'Uploading...' : 'Upload Media' }}
        </button>
      </div>
    </form>
    
    <div v-if="uploadError" class="error-message">
      {{ uploadError }}
      <button @click="clearError">✕</button>
    </div>
    
    <div v-if="uploadSuccess" class="success-message">
      Media uploaded successfully!
    </div>
  </div>
</template>

<style scoped>
.media-upload {
  text-align: center;
}

.upload-form {
  margin: 1rem 0;
}

.file-input-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.success-message {
  color: #155724;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background: #007bff;
  color: white;
}

button[type="submit"]:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style> 