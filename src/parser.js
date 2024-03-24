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
  markdownBoldToHTML,
  markdownItalicToHTML
} = require('./regex.js');

const markdownToHTML = [  
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  //markdownURLToHTML,
  markdownImageToHTML,
  markdownParagraphToHTML,
  markdownH1ToHTML,
  markdownBoldToHTML,
  markdownItalicToHTML
];

const parseMarkdownToHTML = (markdown) => pipe(markdownToHTML)(markdown);

module.exports = { parseMarkdownToHTML };