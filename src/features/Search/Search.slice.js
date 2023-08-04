import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
	name: 'search',
	initialState: {
		value: ''
	},
	reducers: {
		setSearchTerm: (state, action) => {
			state.value = action.payload;
		},
		clearSearchTerm: (state) => {
			state.value = '';
		}
	}
});

export const selectSearchTerm = state => state.search.value;

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
