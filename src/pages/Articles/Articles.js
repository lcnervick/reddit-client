import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingArticles, loadArticles, selectArticles, articlePageTitle } from './Articles.slice';
import { selectSearchTerm } from '../../features/Search/Search.slice';
import Card from '../../components/Card/Card';
import Search from '../../features/Search/Search';

import './Articles.css';

export default function Articles() {
	const dispatch = useDispatch();
	const articles = useSelector(selectArticles);
	const searchTerm = useSelector(selectSearchTerm);
	const isLoading = useSelector(isLoadingArticles);
	const pageTitle = useSelector(articlePageTitle);

	useEffect(() => {
		dispatch(loadArticles({ query: searchTerm, mock: false }));
	}, [dispatch]);
	
	if (isLoading) {
		return (
			<h1>Loading...</h1>
		);
	}

	console.log("Articles", articles);

	return (
	<>
		<Search />
		<h1>{ pageTitle }</h1>
		{
			articles.map((article, index) => <Card key={article.id} index={index} article={article} />)
		}
		<div id="loadMore">&nbsp;</div>
	</>
	);
}
