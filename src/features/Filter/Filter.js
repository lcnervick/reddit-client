import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeMenu, selectFilter, selectFilters, toggleMenu } from './Filter.slice';

import filterImg from '../../common/images/filter.png';
import './Filter.css';

export default function Filter({ active }) {
	const filters = useSelector(selectFilters);
	const dispatch = useDispatch();
	
	const handleChange = ({ target }) => {
		console.log("Changed Selection", filters.topics);
		dispatch(selectFilter({ topic: target.value }));
		dispatch(closeMenu());
	};
	
	return (
		<div className={"filter-options" + (active ? " active" : "")}>
			<div style={{ padding: '25px' }} />
			<div className="filter-topics">
			{
				Object.keys(filters.topics).map(filter => {
					const thisFilter = filters.topics[filter];
					return (
					<div key={filter}>
						<input type="radio" name="filter" value={filter} id={"filter_" + filter} checked={thisFilter.selected} onChange={handleChange} />
						<label htmlFor={"filter_" + filter}>{thisFilter.name}</label>
					</div>
					);
				})
			}
			</div>
		</div>
	);
}

export function FilterButton({ active }) {
	const dispatch = useDispatch();

	const handleClick = () => {
		console.log("Toggling Menu");
		dispatch(toggleMenu());
	};

	console.log("Menu", active);

	return (
		<button className={"filter-button" + (active ? " active" : "")} onClick={handleClick}>
			<img src={filterImg} alt="filter button" />
		</button>
	);
}
