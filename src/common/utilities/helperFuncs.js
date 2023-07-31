export const parseRedditArticleResponse = (articles) => {
	const parsedArticles = [];
	articles.forEach(article => {
		const { author, created, id, name, permalink, score, selftext_html, selftext, subreddit, title, url_overridden_by_dest } = article.data;
		const filteredArticle = {
			author: author,
			created: created,
			id: id,
			name: name,
			permalink: permalink,
			image: url_overridden_by_dest?.replace('https:','http:'),
			score: score,
			post: selftext || "",
			subreddit: subreddit,
			title: title
		};
		parsedArticles.push(filteredArticle);
	})
	return parsedArticles;
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