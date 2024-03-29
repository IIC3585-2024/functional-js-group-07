const { pipe } = require('./pipe.js');
const { 
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  markdownImageToHTML,
  markdownParagraphToHTML,
  markdownItalicBoldToHTML,
  markdownBoldToHTML,
  markdownItalicToHTML,
  markdownCodeToHTML,
  markdownURLToHTML,
  markdownHorizontalRuleToHTML
} = require('./regex.js');
const { headingsParser } = require('./headings.js');

const markdownToHTML = [ 
  markdownURLToHTML,
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  markdownImageToHTML,
  markdownHorizontalRuleToHTML,
  markdownParagraphToHTML,
  markdownItalicBoldToHTML,
  headingsParser,
  markdownBoldToHTML,
  markdownItalicToHTML,
  markdownCodeToHTML,
];

const parseMarkdownToHTML = (markdown) => pipe(markdownToHTML)(markdown);

module.exports = { parseMarkdownToHTML };