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
			selected: name === 'popular'
		};
	});
});
// console.log("Topics", topics)

const filtersSlice = createSlice({
	name: "filters",
	initialState: {
		filters: {
			topics
		},
		menuState: { visible: false }
	},
	reducers: {
		selectFilter: (state, action) => {
			// payload = { topic: 'sports' }
			Object.keys(state.filters.topics).forEach(filter => {
				state.filters.topics[filter].selected = filter === action.payload.topic;
			});
		},
		toggleMenu: (state) => {
			console.log("Here goes...", !state.menuState.visible);
			state.menuState.visible = !state.menuState.visible;
		},
		openMenu: (state) => {
			state.menuState.visible = true;
		},
		closeMenu: (state) => {
			state.menuState.visible = false;
		}
	}
});

export const selectFilters = state => state.filters.filters;
export const selectMenuState = state => state.filters.menuState;

export const { selectFilter, toggleMenu, openMenu, closeMenu } = filtersSlice.actions;

export default filtersSlice.reducer;
