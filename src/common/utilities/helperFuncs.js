import React from 'react';


const getRelativeTime = (previous) => {
	const current = new Date().getTime();
	const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    var elapsed = current - (previous * 1000);

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

export const parseRedditArticleResponse = (articles) => {
	const parsedArticles = [];
	articles.forEach(article => {
		const { author, created_utc, downs, id, name, num_comments, permalink, preview, score, selftext, subreddit, subreddit_name_prefixed, title, url_overridden_by_dest, ups } = article.data;
		const filteredArticle = {
			author: author,
			comments: num_comments,
			created: getRelativeTime(created_utc),
			id: id,
			// image: (preview?.images[0]?.source.url ?? (url_overridden_by_dest ?? "")).replace('https:','https:'),
			image: url_overridden_by_dest?.replace('https:','https:'),
			name: name,
			permalink: permalink,
			post: selftext || "",
			score: ups-downs,
			subreddit: subreddit_name_prefixed,
			title: title
		};
		parsedArticles.push(filteredArticle);
	})
	return parsedArticles;
}

export const parseRedditCommentResponse = (data, isReply = false) => {
	const parsedComments = [];
	// if(!isReply) console.log("Parsing Comments: ", data);
	data.data.children.forEach(comment => {
		const {author, body, created, id, permalink, replies, ups, downs} = comment.data;
		const filteredComment = {
			author: author,
			created: getRelativeTime(created),
			id: id,
			permalink: permalink,
			post: body,
			score: ups-downs,
			replies: replies !== "" ? parseRedditCommentResponse(replies, true) : []
		}
		parsedComments.push(filteredComment);
	});
	if(!isReply) console.log("Parsed Comments: ", parsedComments);
	return parsedComments;
}

export const normalizeListName = name => {
	return name
		// turn underscores into spaces
		.replace(/_/g,' ')
		// capitalize the first letter of each word
		.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
		// lowercase 'And'
		.replace('And', 'and')
		// add commas to list items that come before 'and'
		.replace(/(?<!and)\s(?!and)/, ', ')
}
