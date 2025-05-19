<script>
import MediaService from '../services/MediaService.js'

export default {
  name: 'MediaUpload',
  data() {
    return {
      selectedFiles: [],
      thumbnails: [],
      uploading: false,
      uploadError: null,
      uploadSuccess: false,
      mediaService: new MediaService()
    }
  },
  methods: {
    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      if (files.length + this.selectedFiles.length > 10) {
        this.uploadError = 'You can only upload a maximum of 10 files.';
        return;
      }
      this.selectedFiles = [...this.selectedFiles, ...files];
      this.uploadSuccess = false;
      this.uploadError = null;
      this.createThumbnails(this.selectedFiles);
    },
    
    async uploadFiles() {
      try {
        this.uploading = true;
        this.uploadError = null;
        this.uploadSuccess = false;

        if (!this.selectedFiles.length) {
          throw new Error('Please select files');
        }

        for (const file of this.selectedFiles) {
          const formData = new FormData();
          formData.append('file', file);
          await this.mediaService.createMedia(formData);
        }

        this.uploadSuccess = true;
        this.selectedFiles = [];
        this.thumbnails = [];
        this.$refs.fileInput.value = '';

        // Emit event to parent to refresh media list
        this.$emit('uploaded');

        // Clear success message after 3 seconds
        setTimeout(() => {
          this.uploadSuccess = false;
        }, 3000);

      } catch (error) {
        this.uploadError = error.message;
      } finally {
        this.uploading = false;
      }
    },
    
    clearError() {
      this.uploadError = null
    },
    
    handleFileDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      if (files.length + this.selectedFiles.length > 10) {
        this.uploadError = 'You can only upload a maximum of 10 files.';
        return;
      }
      this.selectedFiles = [...this.selectedFiles, ...files];
      this.uploadSuccess = false;
      this.uploadError = null;
      this.createThumbnails(this.selectedFiles);
    },

    createThumbnails(files) {
      this.thumbnails = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnails.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }
}
</script>

<template>
  <div class="media-upload">
    <h2>Upload New Media</h2>
    
    <form @submit.prevent="uploadFiles" class="upload-form">
      <div 
        class="file-input-group" 
        @dragover.prevent 
        @drop.prevent="handleFileDrop"
        @click="$refs.fileInput.click()"
      >
        <input 
          type="file" 
          @change="handleFileSelect" 
          accept="image/*,video/*"
          ref="fileInput"
          style="display: none;"
          multiple
        />
        <div class="drop-zone">
          Drag and drop your files here or click to select
        </div>
      </div>

      <div class="thumbnail-preview" v-if="selectedFiles.length">
        <div v-for="(file, index) in selectedFiles" :key="index">
          <img :src="thumbnails[index]" alt="File thumbnail" />
        </div>
      </div>

      <button type="submit" :disabled="!selectedFiles.length || uploading">
        {{ uploading ? 'Uploading...' : 'Upload Media' }}
      </button>
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
  border: 2px dashed #007bff;
  padding: 1rem;
  cursor: pointer;
}

.drop-zone {
  flex: 1;
  text-align: center;
  padding: 1rem;
  color: #007bff;
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

.thumbnail-preview {
  margin-top: 1rem;
}

.thumbnail-preview img {
  max-width: 100px;
  max-height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style> 