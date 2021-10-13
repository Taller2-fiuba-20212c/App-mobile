import axios from 'axios';

class Api {
  static async post(url, data) {
    const response = await axios.post(url, data)
    return response.data
  }
}

export default Api