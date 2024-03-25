const { pipe } = require('./pipe.js');
const { 
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  markdownImageToHTML,
  markdownParagraphToHTML,
  markdownH1ToHTML,
  markdownItalicBoldToHTML,
  markdownBoldToHTML,
  markdownItalicToHTML,
  markdownCodeToHTML,
  markdownURLToHTML
} = require('./regex.js');

const markdownToHTML = [ 
  markdownURLToHTML,
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  markdownImageToHTML,
  markdownParagraphToHTML,
  markdownH1ToHTML,
  markdownItalicBoldToHTML,
  markdownBoldToHTML,
  markdownItalicToHTML,
  markdownCodeToHTML
];

const parseMarkdownToHTML = (markdown) => pipe(markdownToHTML)(markdown);

module.exports = { parseMarkdownToHTML };