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
	
			<div className="articleCardTextContainer fade-out"><p>{article.post}</p></div>
			
			<div className="articleCardInfo">
				<div className="articleCardAuthor">{article.author} &bull; <span>{article.created}</span></div>
				<div className="articleCardSubreddit">{article.subreddit}</div>
			</div>

			<div className="articleCardFooter">
				<div className="articleCardVotes">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" icon-name="upvote-outline" fill="currentColor"><path d="M12.877 19H7.123A1.125 1.125 0 016 17.877V11H2.126a1.114 1.114 0 01-1.007-.7 1.249 1.249 0 01.171-1.343L9.166.368a1.128 1.128 0 011.668.004l7.872 8.581a1.252 1.252 0 01.176 1.348 1.114 1.114 0 01-1.005.7H14v6.877A1.125 1.125 0 0112.877 19zM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8zM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016z"></path></svg>
					<span>{Math.abs(article.score) > 1000000 ? ((article.score / 1000000).toFixed(1) + "M") : (Math.abs(article.score) > 1000 ? ((article.score / 1000).toFixed(1) + "K") : (article.score))}</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" icon-name="downvote-outline" fill="currentColor"><path d="M10 20a1.122 1.122 0 01-.834-.372l-7.872-8.581A1.251 1.251 0 011.118 9.7 1.114 1.114 0 012.123 9H6V2.123A1.125 1.125 0 017.123 1h5.754A1.125 1.125 0 0114 2.123V9h3.874a1.114 1.114 0 011.007.7 1.25 1.25 0 01-.171 1.345l-7.876 8.589A1.128 1.128 0 0110 20zm-7.684-9.75L10 18.69l7.74-8.44h-4.99v-8h-5.5v8H2.316zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013z"></path></svg>
				</div>
				<div className="articleCardComments">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" icon-name="comment-outline" fill="currentColor"><path d="M7.725 19.872a.718.718 0 01-.607-.328.725.725 0 01-.118-.397V16H3.625A2.63 2.63 0 011 13.375v-9.75A2.629 2.629 0 013.625 1h12.75A2.63 2.63 0 0119 3.625v9.75A2.63 2.63 0 0116.375 16h-4.161l-4 3.681a.725.725 0 01-.489.191zM3.625 2.25A1.377 1.377 0 002.25 3.625v9.75a1.377 1.377 0 001.375 1.375h4a.625.625 0 01.625.625v2.575l3.3-3.035a.628.628 0 01.424-.165h4.4a1.377 1.377 0 001.375-1.375v-9.75a1.377 1.377 0 00-1.374-1.375H3.625z"></path></svg>
					<span>{article.comments > 1000000 ? ((article.comments / 1000000).toFixed(1) + "M") : (article.comments > 1000 ? ((article.comments / 1000).toFixed(1) + "K") : (article.comments))}</span>
				</div>
			</div>
			
		</article>
	)

	return newCard;
}