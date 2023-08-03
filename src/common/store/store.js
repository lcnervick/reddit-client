import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "../../features/Filter/Filter.slice";
import ArticlesSlice from "../../pages/Articles/Articles.slice";
import SearchSlice from "../../features/Search/Search.slice";

export default configureStore({
	reducer: {
		filters: FilterSlice,
		articles: ArticlesSlice,
		search: SearchSlice
	},
  });