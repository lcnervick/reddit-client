import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMenuState } from '../../features/Filter/Filter.slice';
import Filter, { FilterButton } from '../../features/Filter/Filter';
import { CloseArticleButton } from '../../pages/Article/Article';

import logo from '../../common/images/logo.png';
import './Header.css';

export default function Header() {
	const { articleId } = useParams();
	const menuState = useSelector(selectMenuState);

	return (
		<header>
			{ typeof articleId === 'undefined' ? (<div className="future-icon"></div>) : <CloseArticleButton /> }
			<div className="logo">
				<img src={logo} alt="logo" />
			</div>
			{ 
				typeof articleId === 'undefined' 
				? 
				(
				<>
					<FilterButton active={menuState.visible} />
					<Filter active={menuState.visible} />
				</>
				)
				:
				<div className="future-icon"></div> 
			}
		</header>
	);
}
