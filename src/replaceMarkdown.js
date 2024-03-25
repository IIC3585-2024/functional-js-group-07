const replaceMarkdown = regex => replacement => markdown => markdown.replace(regex, replacement);

module.exports = { replaceMarkdown };
