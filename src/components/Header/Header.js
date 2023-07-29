import React from 'react';
import './Header.css';
import logo from '../../common/images/logo.png';
import { FilterButton } from '../../features/Filter/Filter';

export default function Header() {
	return (
		<header>
			<div className="future-icon"></div>
			<div className="logo">
				<img src={logo} />
			</div>
			<FilterButton />
		</header>
	)
}