import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingArticles, loadArticles, selectArticles, articlePageTitle } from './Articles.slice';

import './Articles.css';
import Card from '../../components/Card/Card';

export default function Articles() {
	const dispatch = useDispatch();
	const articles = useSelector(selectArticles);
	const isLoading = useSelector(isLoadingArticles);
	const pageTitle = useSelector(articlePageTitle);

	useEffect(() => {
		console.log("Showing New Articles");
		dispatch(loadArticles(''))
	}, [dispatch]);
	
	if(isLoading) {
		console.log("Loading...");
		return (
			<h1>Loading...</h1>
		)
	}

	console.log("Articles", articles)

	return (<>
		<h1>{pageTitle}</h1>
		{
			articles.map((article,index) => <Card key={article.id} index={index} article={article} />)
		}
		<div id="loadMore">&nbsp;</div>
	</>)
}