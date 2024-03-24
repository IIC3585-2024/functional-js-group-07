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
  markdownItalicToHTML
} = require('./regex.js');
const { headingsParser } = require('./headings.js');

const markdownToHTML = [  
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  //markdownURLToHTML,
  markdownImageToHTML,
  markdownParagraphToHTML,
  headingsParser,
  markdownBoldToHTML,
  markdownItalicToHTML
];

const parseMarkdownToHTML = (markdown) => pipe(markdownToHTML)(markdown);

module.exports = { parseMarkdownToHTML };