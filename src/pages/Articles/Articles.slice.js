import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseRedditArticleResponse } from '../../common/utilities/helperFuncs';

import data from '../../common/store/mock.popular.json';

export const loadArticles = createAsyncThunk(
	'articles/loadArticles',
	async ({query, mock}) => {
		let url = 'http://www.reddit.com/';
		let title = 'Popular Posts';
		if(query) {
			url += `search.json?q=${encodeURI(query)}`;
			title = `Search Results: ${query}`;
		} else {
			url += 'r/popular.json';
		}

		// MOCK RETURN
		if(mock) {
			console.log("JSON", data.data.children);
			return {title: title, posts: parseRedditArticleResponse(data.data.children)};
		}

		try {
			const response = await fetch(url, {cache:"no-cache"});
			if(response.ok) {
				const json = await response.json();
				console.log("JSON", json.data.children);
				return {title: title, posts: parseRedditArticleResponse(json.data.children)};
			}
			else throw new Error("Could Not Fetch Articles");
		} catch(err) {
			console.log("ERROR:", err);
		}
	}
)

const articlesSlice = createSlice({
	name: 'articles',
	initialState: {
		articles: [],
		title: '',
		isLoading: false,
		hasError: false,
	},
	reducers: {
		setArticles: (state, action) => {
			state.articles = action.payload.posts;
		},
		addArticles: (state, action) => {
			state.articles.push(action.payload.posts);
		},
		clearArticles: (state) => {
			state.articles = [];
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadArticles.pending, (state) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(loadArticles.fulfilled, (state, action) => {
				state.articles = action.payload.posts;
				state.title = action.payload.title
				state.isLoading = false;
				state.hasError = false;
			})
			.addCase(loadArticles.rejected, (state) => {
				state.isLoading = false;
				state.hasError = true;
			})
	}
});


export const selectArticles = state => state.articles.articles;

export const isLoadingArticles = (state) => state.articles.isLoading;
export const articlePageTitle = (state) => state.articles.title;

export const { setArticles, addArticles, clearArticles } = articlesSlice.actions;

export default articlesSlice.reducer;