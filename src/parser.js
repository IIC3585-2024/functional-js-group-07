const { pipe } = require('./pipe.js');
const { 
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  markdownImageToHTML,
  markdownParagraphToHTML,
  markdownBoldToHTML,
  markdownItalicToHTML,
  markdownCodeToHTML,
  markdownURLToHTML
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
  markdownParagraphToHTML,
  headingsParser,
  markdownBoldToHTML,
  markdownItalicToHTML,
  markdownCodeToHTML
];

const parseMarkdownToHTML = (markdown) => pipe(markdownToHTML)(markdown);

module.exports = { parseMarkdownToHTML };