import React from 'react';
import filter from '../../common/images/filter.png';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilters } from './Filter.slice';

export const toggleFilter = (openFilter = null) => {
	if(openFilter === null) {

	}
}

export function FilterButton() {
	return (
		<div className="filter-button" onClick={toggleFilter}>
			<img src={filter} />
		</div>
	)
}

export default function Filter() {
	const filters = useSelector(selectFilters);
	const dispatch = useDispatch();

	return (
		<div className="filter-options">

		</div>
	)
}