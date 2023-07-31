
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