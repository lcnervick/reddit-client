import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilters } from './Filter.slice';
import filter from '../../common/images/filter.png';

export const toggleFilter = (openFilter = null) => {
	if (openFilter === null) {
// comment
	}
};

export function FilterButton() {
	return (
		<button className="filter-button" onClick={toggleFilter}>
			<img src={filter} alt="filter button" />
		</button>
	);
}

export default function Filter() {
	const filters = useSelector(selectFilters);
	const dispatch = useDispatch();

	return (
		<div className="filter-options">

		</div>
	);
}
