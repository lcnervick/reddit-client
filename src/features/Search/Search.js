import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "./Search.slice";
import { loadArticles } from "../../pages/Articles/Articles.slice";

import './Search.css';

export default function Search() {
	const searchTerm = useSelector(selectSearchTerm);
	const dispatch = useDispatch();
	
	const handleChange = e => {
		dispatch(setSearchTerm(e.target.value));
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log("Searching for: ", searchTerm);
		dispatch(loadArticles({ query: searchTerm, mock: false }));
	};
	
	return (
		<form className="search" onSubmit={handleSubmit}>
			<input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
			<button className="dark-button">Go</button>
		</form>
	);
}
