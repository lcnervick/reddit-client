import React from 'react';
import { useInView } from 'react-intersection-observer';
import './Card.css';
import { useNavigate } from 'react-router-dom';

export default function Card({article, index}) {
	// article = { author, comments, created, id, image, name, permalink, post, score, subreddit, title }
	const { ref, inView, entry } = useInView({rootMargin: '100px'});
	const navigate = useNavigate();
	const goToArticle = () => {
		navigate(`/${article.id}`);
	}

	const newCard = (
		<article
			ref={ref}
			className={"articleCard animate " + (index % 2 ? "animate-slide-left" : "animate-slide-right") + (inView ? " animate-active" : "")}
			onClick={goToArticle}
		>
			{ article.image && (<figure><img src={article.image.replace('https:','http:')} className="articleCardImage image-placeholder" alt="Post Preview Image" /></figure>) }
			
			<h3>{article.title}</h3>
	
			<div className="articleTextContainer fade-out"><p>{article.post}</p></div>
			
			<div className="articleInfo">
				<div className="articleAuthor">{article.author} &bull; <span>{article.created}</span></div>
				<div className="articleSubreddit">{article.subreddit}</div>
			</div>

			<div className="articleFooter">

			</div>
			
		</article>
	)

	return newCard;
}