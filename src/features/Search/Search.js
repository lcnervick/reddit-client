import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm, setSearchTerm } from "./Search.slice";
import { loadArticles } from "../../pages/Articles/Articles.slice";
import { getActiveTopic } from "../../common/utilities/helperFuncs";
import { closeMenu, selectFilters, selectMenuState } from "../Filter/Filter.slice";

import './Search.css';

export default function Search() {
	const filters = useSelector(selectFilters);
	const searchTerm = useSelector(selectSearchTerm);
	const menuState = useSelector(selectMenuState);

	const dispatch = useDispatch();
	
	const handleChange = e => {
		dispatch(setSearchTerm(e.target.value));
	};

	const handleClick = () => {
		dispatch(setSearchTerm(''));
		dispatch(loadArticles({ query: '', topic: getActiveTopic(filters.topics) }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(loadArticles({ query: searchTerm, topic: getActiveTopic(filters.topics) }));
		dispatch(closeMenu());
	};
	
	return (
		<form className={"search" + (menuState.visible ? " frozen" : "")} onSubmit={handleSubmit}>
			<input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
			<button className="clear-search" type="button" onClick={handleClick}>X</button>
			<button className="dark-button">Go</button>
		</form>
	);
}
