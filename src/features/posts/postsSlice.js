import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postsApi } from '../../api/posts';

const initialState = {
	posts: [],
	status: 'idle',
	error: null,
	pageSize: 5,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async page => {
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	const daysToMs = 24 * 60 * 60 * 1000;

	const response = await postsApi.get();
	const posts = response.data;

	return posts.map(post => {
		const postDate = new Date(
			Date.now() - getRandomInt(0, 360) * daysToMs
		).toDateString();

		return { ...post, date: postDate };
	});
});

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postDeleted(state, action) {
			state.posts = state.posts.filter(post => {
				return post.id !== action.payload.id;
			});
		},
		reactionAdded(state, action) {
			const { id, reaction } = action.payload;
			const existingPost = state.posts.find(post => post.id === id);
			if (existingPost) {
				if (!existingPost.reactions) {
					existingPost.reactions = { likes: 0, dislikes: 0 };
				}
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers: {
		[fetchPosts.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.posts = state.posts.concat(action.payload);
		},
		[fetchPosts.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
	},
});

export const { reducer: postsReducer } = postsSlice;

export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) =>
	state.posts.posts.find(post => post.id === postId);

export const selectPostReactions = (state, postId) => {
	const post = state.posts.posts.find(post => post.id === postId);
	if (post) {
		if (!post.reactions) return { likes: 0, dislikes: 0 };
		return post.reactions;
	}
};

export const { postDeleted, reactionAdded } = postsSlice.actions;
