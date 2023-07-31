import React from 'react';
import './Card.css';

export default function Card({article, index}) {
	// article = { author, created, id, image, name, permalink, post, score, subreddit, title }
	return (
		<article className={"articleCard" + (index % 2 ? " animate-slide-left" : " animate-slide-right")}>
			{ article.image && (<figure><img src={article.image.replace('https:','http:')} className="articleCardImage" alt="Post Preview Image" /></figure>) }
			<h3>{article.title}</h3>
			<div className="articleTextContainer"><p>{article.post}</p></div>
		</article>
	)
}