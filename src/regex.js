const replaceH1 = (markdown) => {
  return markdown.replace(/^#\s*(.*)$/gim, '<h1>$1</h1>');
};

const replaceMarkdown = (regex, replacement) => (markdown) => {
  return markdown.replace(regex, replacement);
};

const h1Regex = /^#\s*(.*)$/gim;
const boldRegex = /\*\*(.*)\*\*/g;
const boldRegex1 = /__(.*)__/g;
const boldRegex2 = /\*\*(.*)\*\*|__(.*)__/g; // TODO: Investigar cómo referenciar el grupo de captura en el replacement
const italicRegex = /(?<!\*)\*(?!\*)(.*)(?<!\*)\*(?!\*)/g;

//console.log(replaceMarkdown(h1Regex, '<h1>$1</h1>')('# Hello, World!\n#  :)'));


function markdownUnorderedListToHTML (markdown) {
  const unorderedListRegex = /^[*-+](?!\*)(.*)$/gm;
  const wholeUnorderedListRegex = /((?:    <li>.*\n)+)/g;
  

  const transformToUnorderedListHTML = (match, capturedText) => `    <li>${capturedText}</li>`;
  return markdown.replace(unorderedListRegex, transformToUnorderedListHTML).replace(wholeUnorderedListRegex,`<ul>\n$1</ul>`)
}

// Testing de la funcion
const markdownUnorderedList = `* Item 1
* Item 2
* Item 3`


function markdownOrderedListToHTML (markdown) {
  const orderedListRegex = /^\s*\d+\.(.*)$/gm;
  const wholeOrderedListRegex = /((?:\d+\..*\n)+)/g;

  const transformToOrderedListHTML = (match, capturedText) => `    <li>${capturedText}</li>`;

  return markdown.replace(wholeOrderedListRegex,`<ol>\n$1</ol>`).replace(orderedListRegex, transformToOrderedListHTML);
}

// Testing de la funcion
const markdownOrderedList = `1. Item 1
2. Item 2
3. Item 3`


// BLOCKQUOTE

// Testing de la funcion
const markdownBlockquote = `> Blockquote 1
>
> Blockquote 3`


function markdownBlockquotesToHTML (markdown) {
  const blockquotesRegex = /^>(.*)$/gm;
  const wholeBlockquoteRegex = /((?:    .*\n)+)/g;

  const transformToBlockquotesHTML = (match,capturedText) => `    ${capturedText}`

  return markdown
    .replace(blockquotesRegex, transformToBlockquotesHTML)
    .replace(wholeBlockquoteRegex,`<blockquote>\n$1</blockquote>`);
}


// CODE BLOCK

// Testing de la funcion
const markdownCodeBlock = `This is a paragraph
    This is a code block
This is the next paragraph
`

function markdownCodeBlockToHTML (markdown) {
  // code blocks start with ``` and end with ```. It can have multiple lines.
  const codeBlockRegex = /```([\s\S]*?)```/g;

  // replace the code block with the code block HTML, and remove the ``` from the start and end
  const transformToCodeBlockHTML = (match, capturedText) => {
    let codeBlock = capturedText.split('\n');
    codeBlock.pop();
    codeBlock = codeBlock.map(line => `    ${line}`).join('\n');
    return `<code>${codeBlock}\n</code>`;
  }
  return markdown.replace(codeBlockRegex, transformToCodeBlockHTML);
}


// PARAGRAPHS

// Testing de la funcion
const markdownParagraph = `This is a paragraph  
This is the next section of the paragraph

## This is a header

This is the next paragraph`

function markdownParagraphToHTML (markdown) {


  // Regex obtained from https://stackoverflow.com/questions/64451899/markdown-paragraph-tag-regex
  const paragraphRegex = /^[A-Za-z\*].*(?:\n[A-Za-z].*)*/gm;
  // replace new lines and double spaces with a break tag
  const breakTagRegex = /\s{2,}\n/g;
  
  const transformToParagraphHTML = (match) => `<p>${match.replace(breakTagRegex, '<br>')}</p>`;

  return markdown.replace(paragraphRegex, transformToParagraphHTML);
}


// LINKS

// Testing de la funcion
const markdownLink = `[This is a link](https://www.google.com)`
const markdownLink2 = `[This is a link](https://www.google.com) and [This is another link](https://www.google.com "Google")`

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


// URLS AND EMAILS

//Testing de la funcion
const markdownURl = `<https://www.google.com>`
const markdownURl2 = `<https://www.google.com> and <fake@example.com>`

function markdownURLToHTML (markdown) {
  const urlRegex = /<(.+?)>/g;

  const transformToURLHTML = (match, url) => `<a href="${url}">${url}</a>`;

  return markdown.replace(urlRegex, transformToURLHTML);
}



// IMAGES

// Testing de la funcion
const markdownImage = `![This is an image](https://www.google.com)`
const markdownImage2 = `![This is an image](https://www.google.com) and ![This is another image](https://www.google.com)`

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


// create array of replaceMarkdown functions with each regex
const markdownToHTML = [
  
  markdownBlockquotesToHTML,
  markdownUnorderedListToHTML,
  markdownOrderedListToHTML,
  markdownCodeBlockToHTML,
  markdownLinkToHTML,
  //markdownURLToHTML,
  markdownImageToHTML,
  markdownParagraphToHTML,
  replaceMarkdown(h1Regex, '<h1>$1</h1>'),
  replaceMarkdown(boldRegex2, '<strong>$1$2</strong>'),
  replaceMarkdown(italicRegex, '<em>$1</em>'),
];

// apply each function to the markdown text
const markdownToHTMLText = (markdown) => {
  return markdownToHTML.reduce((acc, func) => func(acc), markdown);
}

// Testing de la funcion
const markdownText = `# Hello, World!

**texto en negrita** hola como wlkasjdhfoasjd

* Item 1
* Item 2
* Item 3

1. Item 1
2. Item 2
3. Item 3

> Blockquote 1
>
> Blockquote 3

This is a paragraph
\`\`\`
This is a code block
This is the next line of the code block

This is the next line of the code block
\`\`\`
This is the next paragraph

This is a paragraph  
This is the next section of the paragraph

# This is a header

This is the next paragraph

[This is a link](https://www.google.com)

<https://www.google.com>

![This is an image](https://www.google.com)`

// console.log(markdownToHTMLText(markdownText));

module.exports = { markdownToHTMLText };