import { createSlice } from "@reduxjs/toolkit";

// MOCK categories
const categories = {
	'sports': {
		name: 'sports',
		selected: false
	}
};

const filtersSlice = createSlice({
	name: "filters",
	initialState: {
		filters: {
			categories: categories
		}
	},
	reducers: {
		selectFilter: (state, action) => {
			// payload = {category: 'sports'}
			state.filters.categories[action.payload.category].selected = true;
		},
		deSelectFilter: (state, action) => {
			// payload = {category: 'sports'}
			state.filters.categories[action.payload.category].selected = false;
		},
		toggleFilter: (state, action) => {
			// payload = {category: 'sports'}
			state.filters.categories[action.payload.category].selected = !state.filters.categories[action.payload.category].selected;
		}
	}
});

export const selectFilters = state => state.filters.filters;

export const { selectFilter, deSelectFilter, toggleFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
