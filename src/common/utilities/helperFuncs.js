
const getRelativeTime = (previous) => {
	const current = new Date().getTime();
	const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - (previous * 1000);

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
	}

    if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';   
    }

    if (elapsed < msPerDay) {
         return Math.round(elapsed / msPerHour) + ' hours ago';   
    }

    if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';   
    }

    if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';   
    }

    return Math.round(elapsed / msPerYear) + ' years ago';   
};

export const parseRedditArticleResponse = (articles) => {
	const parsedArticles = [];
	articles.forEach(article => {
		const { author, created_utc, downs, id, name, num_comments, permalink, selftext, subreddit_name_prefixed, title, url_overridden_by_dest, ups } = article.data;
		const filteredArticle = {
			author,
			comments: num_comments,
			created: getRelativeTime(created_utc),
			id,
			// image: (preview?.images[0]?.source.url ?? (url_overridden_by_dest ?? "")).replace('https:','https:'),
			image: url_overridden_by_dest?.replace('https:', 'https:'),
			name,
			permalink,
			post: selftext || "",
			score: ups - downs,
			subreddit: subreddit_name_prefixed,
			title
		};
		parsedArticles.push(filteredArticle);
	});
	return parsedArticles;
};

export const parseRedditCommentResponse = (data) => {
	const parsedComments = [];
	if (typeof data === 'undefined' || typeof data.data === 'undefined') return []; // console.log("Undefined Data", JSON.parse(JSON.stringify(data)));
	data.data.children.forEach(comment => {
		const { author, body, created, id, permalink, replies, ups, downs } = comment.data;
		const filteredComment = {
			author,
			created: getRelativeTime(created),
			id,
			permalink,
			post: body,
			score: ups - downs,
			replies: replies !== "" ? parseRedditCommentResponse(replies, true) : []
		};
		parsedComments.push(filteredComment);
	});
	return parsedComments;
};

export const normalizeListName = name => name
	// turn underscores into spaces
	.replace(/_/g, ' ')
	// capitalize the first letter of each word
	.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
	// lowercase 'And'
	.replace('And', 'and')
	// add commas to list items that come before 'and'
	.replace(/(?<!and)\s(?!and)/, ', ');


export const getActiveTopic = (topics) => {
	let activeTopic = null;
	Object.keys(topics).forEach(topic => {
		if (topics[topic].selected) activeTopic = topic;
	});
	return activeTopic;
};
