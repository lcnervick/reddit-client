import React from 'react';
import './Article.css';
import { useParams } from 'react-router-dom';

export default function Article() {
	const { articleId } = useParams();

	return (<>
		<h1>{articleId}</h1>
	</>)
}