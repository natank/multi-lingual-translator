import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts';
import { pagesReducer } from '../features/paging';
import { languageReducer } from '../features/language';

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		pages: pagesReducer,
		language: languageReducer,
	},
});
