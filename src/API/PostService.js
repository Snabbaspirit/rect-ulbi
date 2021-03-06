import axios from 'axios';

export default class PostService {
    static async getAll() {
        const response = await axios.get('https://jsonjplaceholder.typicode.com/posts');
        return response.data
    }
}