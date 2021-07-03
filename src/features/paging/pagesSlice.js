import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currPage: 1,
};

const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		pageSelected(state, action) {
			state.currPage = action.payload.value;
		},
	},
});

export const { reducer: pagesReducer } = pagesSlice;
export const selectCurrPage = state => {
	return state.pages.currPage;
};

export const { pageSelected } = pagesSlice.actions;
