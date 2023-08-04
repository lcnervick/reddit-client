import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { normalizeListName, parseRedditArticleResponse } from '../../common/utilities/helperFuncs';

import data from '../../common/store/mock.popular.json';

export const loadArticles = createAsyncThunk(
	'articles/loadArticles',
	async ({ query, topic }) => {
		const mock = false;
		const topicName = normalizeListName(topic);

		let url = `https://www.reddit.com/`;
		let title = `${topicName} Posts`;

		if (query) {
			title = `${topicName} Search Results`;
			url += `search.json?q=${encodeURI(query)}`;
			if (topic !== 'popular') url += `&t=${topic}`;
		} else {
			url += (topic === 'popular' ? 'r/popular.json' : `r/${topic}.json`);
		}

		// MOCK RETURN
		if (mock) {
			// console.log("JSON", data.data.children);
			return { title, posts: parseRedditArticleResponse(data.data.children) };
		}

		try {
			const response = await fetch(url, { cache: "no-cache" });
			if (response.ok) {
				const json = await response.json();
				// console.log("JSON", json.data.children);
				return { title, posts: parseRedditArticleResponse(json.data.children) };
			}
			throw new Error("Could Not Fetch Articles");
		} catch (err) {
			console.log("ERROR:", err);
			return { title: 'Error: No Posts Found', posts: [] };
		}
	}
);

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
				state.title = action.payload.title;
				state.isLoading = false;
				state.hasError = false;
			})
			.addCase(loadArticles.rejected, (state) => {
				state.isLoading = false;
				state.hasError = true;
			});
	}
});


export const selectArticles = state => state.articles.articles;

export const isLoadingArticles = (state) => state.articles.isLoading;
export const articlePageTitle = (state) => state.articles.title;

export const { setArticles, addArticles, clearArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
