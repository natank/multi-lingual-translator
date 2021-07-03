import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as translatorApi from '../../api/translator';
const initialState = {
	list: [
		{
			id: 'he',
			title: 'Hebrew',
		},
		{
			id: 'ar',
			title: 'Arabic',
		},
		{
			id: 'nl',
			title: 'Dutch',
		},
		{
			id: 'fr',
			title: 'France',
		},
	],
	translatedPosts: null,
	currentLanguage: -1,
	status: 'idle',
	error: null,
};

export const translatePosts = createAsyncThunk(
	'language/translatePosts',
	async ({ posts, language }) => {
		if (language === -1) return null;
		let translationsPromiseArr = posts.map(post =>
			translatorApi.translate({
				data: [{ text: post.body }, { text: post.title }],
				fromLang: 'en',
				toLang: [language.id],
			})
		);
		try {
			const translations = await Promise.all(translationsPromiseArr);
			return posts.map((post, index) => ({
				...post,
				body: translations[index][0],
				title: translations[index][1],
			}));
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
);

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		languageSelected(state, action) {
			state.currentLanguage = action.payload;
		},
	},
	extraReducers: {
		[translatePosts.pending]: (state, action) => {
			state.status = 'loading';
		},
		[translatePosts.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			state.translatedPosts = action.payload;
		},
		[translatePosts.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
	},
});

export const { reducer: languageReducer } = languageSlice;

export const selectLanguageList = state => state.language.list;
export const selectCurrentLanguage = state => {
	return state.language.list.find(
		language => language.id === state.language.currentLanguage
	);
};
export const selectTranslatedPosts = state => state.language.translatedPosts;

export const { languageSelected } = languageSlice.actions;
