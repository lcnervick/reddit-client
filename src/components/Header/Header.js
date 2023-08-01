import React from 'react';
import './Header.css';
import logo from '../../common/images/logo.png';
import { FilterButton } from '../../features/Filter/Filter';
import { useParams } from 'react-router-dom';
import { CloseArticleButton } from '../../pages/Article/Article';

export default function Header() {
	const { articleId } = useParams();
	console.log("Header Params", articleId);
	return (
		<header>
			{ typeof articleId === 'undefined' ? (<div className="future-icon"></div>) : <CloseArticleButton /> }
			<div className="logo">
				<img src={logo} />
			</div>
			{ typeof articleId === 'undefined' ? <FilterButton /> : <div className="future-icon"></div>}
			
		</header>
	)
}