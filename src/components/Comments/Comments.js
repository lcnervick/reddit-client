import React, { useEffect, useState } from "react";
import data from '../../common/store/mock.comments.json';
import { parseRedditCommentResponse } from "../../common/utilities/helperFuncs";

import './Comments.css';

export default function Comments({articleId}) {
	const mock = true;
	const [comments, setComments] = useState([]);
	useEffect(() => {
		const getComments = async articleId => {
			let url = `https://www.reddit.com/comments/${articleId}.json`;
	
			// MOCK RETURN
			if(mock) {
				// console.log("Comments: ", data);
				setComments(parseRedditCommentResponse(data[1]));
				return;
			}
	
			try {
				const response = await fetch(url, {cache:"no-cache"});
				if(response.ok) {
					// console.log("Comments: ", json)
					const json = await response.json();
					setComments(parseRedditCommentResponse(json[1]));
				}
				else throw new Error("Could Not Fetch Comments");
			} catch(err) {
				setComments([]);
				console.log("ERROR:", err);
			}
		}
	
		// console.trace("Getting Comments: ",comments);
		getComments(articleId).catch(console.error);
	},[]);

	console.log("Comments: ",comments);
	return (
		<div className="commentsContainer">
			{	comments.length
				?
				comments.map(comment => <Comment comment={comment} key={comment.id} />)
				:
				<h2>Loading Comments...</h2>

			}
		</div>
	)
}

export function Comment({comment, reply = false}) {
	const {author, created, id, permalink, post, replies, score} = comment;
	console.log("Comment: ", comment)
	return (
		<div className={"comment" + (reply ? " comment-reply" : '')}>
			<div className="comment-info">
				<div>{author} &bull; {created}</div>
				<div className="comment-score">
					<svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 20 20" icon-name="upvote-outline" fill="currentColor"><path d="M12.877 19H7.123A1.125 1.125 0 016 17.877V11H2.126a1.114 1.114 0 01-1.007-.7 1.249 1.249 0 01.171-1.343L9.166.368a1.128 1.128 0 011.668.004l7.872 8.581a1.252 1.252 0 01.176 1.348 1.114 1.114 0 01-1.005.7H14v6.877A1.125 1.125 0 0112.877 19zM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8zM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016z"></path></svg>
					<span>{Math.abs(score) > 1000000 ? ((score / 1000000).toFixed(1) + "M") : (Math.abs(score) > 1000 ? ((score / 1000).toFixed(1) + "K") : (score))}</span>
					<svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 20 20" icon-name="downvote-outline" fill="currentColor"><path d="M10 20a1.122 1.122 0 01-.834-.372l-7.872-8.581A1.251 1.251 0 011.118 9.7 1.114 1.114 0 012.123 9H6V2.123A1.125 1.125 0 017.123 1h5.754A1.125 1.125 0 0114 2.123V9h3.874a1.114 1.114 0 011.007.7 1.25 1.25 0 01-.171 1.345l-7.876 8.589A1.128 1.128 0 0110 20zm-7.684-9.75L10 18.69l7.74-8.44h-4.99v-8h-5.5v8H2.316zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013z"></path></svg>
				</div>
			</div>
			<p>{post}</p>
			{
				replies.length
				?
				replies.map(reply => <Comment comment={reply} key={reply.id} reply={true} />)
				:
				''
			}
		</div>
	)
}