import React from 'react';
import { useParams } from 'react-router-dom';
import { FilterButton } from '../../features/Filter/Filter';
import { CloseArticleButton } from '../../pages/Article/Article';

import logo from '../../common/images/logo.png';
import './Header.css';

export default function Header() {
	const { articleId } = useParams();
	console.log("Header Params", articleId);
	return (
		<header>
			{ typeof articleId === 'undefined' ? (<div className="future-icon"></div>) : <CloseArticleButton /> }
			<div className="logo">
				<img src={logo} alt="logo" />
			</div>
			{ typeof articleId === 'undefined' ? <FilterButton /> : <div className="future-icon"></div> }
			
		</header>
	);
}
