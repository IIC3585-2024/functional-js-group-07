const replaceMarkdown = (regex, replacement) => (markdown) => {
  return markdown.replace(regex, replacement);
};

const h1Regex = /^#\s*(.*)$/gim;
const boldRegex = /\*\*(.*)\*\*|__(.*)__/g;
const italicRegex = /(?<!\*)\*(?!\*)(.*)(?<!\*)\*(?!\*)/g;

function markdownUnorderedListToHTML (markdown) {
  const unorderedListRegex = /^[*-+](?!\*)(.*)$/gm;
  const wholeUnorderedListRegex = /((?:    <li>.*\n)+)/g;
  

  const transformToUnorderedListHTML = (match, capturedText) => `    <li>${capturedText}</li>`;
  return markdown.replace(unorderedListRegex, transformToUnorderedListHTML).replace(wholeUnorderedListRegex,`<ul>\n$1</ul>`)
}

function markdownOrderedListToHTML (markdown) {
  const orderedListRegex = /^\s*\d+\.(.*)$/gm;
  const wholeOrderedListRegex = /((?:\d+\..*\n)+)/g;

  const transformToOrderedListHTML = (match, capturedText) => `    <li>${capturedText}</li>`;

  return markdown.replace(wholeOrderedListRegex,`<ol>\n$1</ol>`).replace(orderedListRegex, transformToOrderedListHTML);
}

function markdownBlockquotesToHTML (markdown) {
  const blockquotesRegex = /^> *(.*)$/gm;
  const wholeBlockquoteRegex = /((?:    .*\n)+)/g;

  const transformToBlockquotesHTML = (match, capturedText) => {
    const pFormatText = markdownParagraphToHTML(capturedText);
    return `    ${pFormatText}`;
  }

  return markdown
    .replace(blockquotesRegex, transformToBlockquotesHTML)
    .replace(wholeBlockquoteRegex,`<blockquote>\n$1</blockquote>`);
}

function markdownCodeBlockToHTML (markdown) {
  const codeBlockRegex = /```([\s\S]*?)```/g;

  // replace the code block with the code block HTML, and remove the ``` from the start and end
  const transformToCodeBlockHTML = (match, capturedText) => {
    let codeBlock = capturedText.split('\n');
    codeBlock.pop();
    codeBlock = codeBlock.map(line => `    ${line}`).join('\n');
    return `<pre><code>${codeBlock}\n</code></pre>`;
  }
  return markdown.replace(codeBlockRegex, transformToCodeBlockHTML);
}

function markdownParagraphToHTML (markdown) {


  // Regex modified from https://stackoverflow.com/questions/64451899/markdown-paragraph-tag-regex
  const paragraphRegex = /^[A-Za-z\*].*(?:\n[A-Za-z].*)*/gm;
  // replace new lines and double spaces with a break tag
  const breakTagRegex = /\s{2,}\n/g;
  
  const transformToParagraphHTML = (match) => `<p>${match.replace(breakTagRegex, '<br>')}</p>`;

  return markdown.replace(paragraphRegex, transformToParagraphHTML);
}

function markdownLinkToHTML (markdown) {
  const linkRegex = /(?<!\!)\[(.*?)\]\((.*?)\)/g;
  
  // check if the link has a title, if it does, add it to the link as a title attribute
  const transformToLinkHTML = (match, text, url) => {
    const titleRegex = /\ "(.*?)"/;
    if (titleRegex.test(url)) {
      const title = url.match(titleRegex)[1];
      return `<a href="${url.replace(titleRegex, '')}" title="${title}">${text}</a>`;
    } else {
      return `<a href="${url}">${text}</a>`;
    }
  }

  return markdown.replace(linkRegex, transformToLinkHTML);
}

function markdownURLToHTML (markdown) {
  const urlRegex = /<(.+?)>/g;

  const transformToURLHTML = (match, url) => `<a href="${url}">${url}</a>`;

  return markdown.replace(urlRegex, transformToURLHTML);
}

function markdownImageToHTML (markdown) {
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;

  // check if the image has a title, if it does, add it to the image as a title attribute
  const transformToImageHTML = (match, text, url) => {
    const titleRegex = /\ "(.*?)"/;
    if (titleRegex.test(url)) {
      const title = url.match(titleRegex)[1];
      return `<img src="${url.replace(titleRegex, '')}" alt="${text}" title="${title}">`;
    } else {
      return `<img src="${url}" alt="${text}">`;
    }
  }

  return markdown.replace(imageRegex, transformToImageHTML);
}

const markdownH1ToHTML = replaceMarkdown(h1Regex, '<h1>$1</h1>');
const markdownBoldToHTML = replaceMarkdown(boldRegex, '<strong>$1$2</strong>');
const markdownItalicToHTML = replaceMarkdown(italicRegex, '<em>$1</em>');

module.exports = {
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownBlockquotesToHTML,
  markdownCodeBlockToHTML,
  markdownParagraphToHTML,
  markdownLinkToHTML,
  markdownURLToHTML,
  markdownImageToHTML,
  markdownH1ToHTML,
  markdownBoldToHTML,
  markdownItalicToHTML
};
