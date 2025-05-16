import HttpService from './HttpService.js'

class MediaService {
  constructor() {
    this.httpService = new HttpService()
  }

  async getAllMedias() {
    try {
      const response = await this.httpService.get('/media/v1')
      return response || []
    } catch (error) {
      console.error('Failed to fetch medias:', error)
      if (error.message.includes('404')) {
        throw new Error('No media found')
      }
      throw new Error('Unable to load medias')
    }
  }

  getMediaFileUrl(id) {
    try {
      console.log(`${this.httpService.baseURL}/media/v1/${id}/file`)
      return `${this.httpService.baseURL}/media/v1/${id}/file`
    } catch (error) {
      console.error('Failed to get media file URL:', error)
      throw new Error('Unable to get media file URL')
    }
  }


  async createMedia(formData) {
    try {
      const response = await this.httpService.post('/media/v1', formData)
      return response
    } catch (error) {
      console.error('Failed to upload media:', error)
      if (error.message.includes('413')) {
        throw new Error('File too large')
      }
      if (error.message.includes('415')) {
        throw new Error('File type not supported')
      }
      throw new Error('Upload failed')
    }
  }

  async deleteMedia(id) {
    try {
      return await this.httpService.delete(`/media/v1/${id}`)
    } catch (error) {
      console.error('Failed to delete media:', error)
      throw new Error('Delete failed')
    }
  }
}

export default MediaService 