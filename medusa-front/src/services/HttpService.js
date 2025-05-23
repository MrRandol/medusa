class HttpService {
  constructor() {
    try {
      this.baseURL = process.env.VITE_API_URL
    } catch (error) {
      console.error('Error getting base URL:', error)
      this.baseURL ='http://localhost:8080'
    } 
  }

  async get(url) {
    try {
      const response = await fetch(`${this.baseURL}${url}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      throw error
    }
  }

  async post(url, data) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'POST',
        body: data
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      throw error
    }
  }

  async delete(url) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response
    } catch (error) {
      throw error
    }
  }
}

export default HttpService 