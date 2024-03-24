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

const parseMarkdownToHTML = (markdown) => {
  return markdownToHTML.reduce((acc, func) => func(acc), markdown);
}

module.exports = { parseMarkdownToHTML };