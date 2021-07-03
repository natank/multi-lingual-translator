import axios from 'axios';
const postsApi = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/posts',
});

export { postsApi };
