import { createSlice } from "@reduxjs/toolkit";
import { normalizeListName } from "../../common/utilities/helperFuncs";
import data from '../../common/store/mock.topics.json';

// MOCK categories
const topics = {};
data.forEach(item => {
	Object.keys(item).forEach(name => {
		topics[name] = {
			name: normalizeListName(name),
			link: item[name],
			selected: false
		};
	});
});
// console.log("Topics", topics)

const filtersSlice = createSlice({
	name: "filters",
	initialState: {
		filters: {
			topics
		}
	},
	reducers: {
		selectFilter: (state, action) => {
			// payload = { topic: 'sports' }
			state.filters.topics[action.payload.topic].selected = true;
		},
		deSelectFilter: (state, action) => {
			// payload = { topic: 'sports' }
			state.filters.topics[action.payload.topic].selected = false;
		},
		toggleFilter: (state, action) => {
			// payload = { topic: 'sports' }
			state.filters.topics[action.payload.topic].selected = !state.filters.topics[action.payload.topic].selected;
		}
	}
});

export const selectFilters = state => state.filters.filters;

export const { selectFilter, deSelectFilter, toggleFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
