import { configureStore } from "@reduxjs/toolkit";
import FilterSlice from "../../features/Filter/Filter.slice";

export default configureStore({
	reducer: {
		filters: FilterSlice
	},
  });