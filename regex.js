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
const italicRegex = /\*{1,1}(.*)\*{1,1}/g; // TODO: Mejorar esto, para que no capture las negritas 


console.log(replaceH1('# Hello, World!'));
console.log(replaceMarkdown(h1Regex, '<h1>$1</h1>')('# Hello, World!\n#  :)'));
console.log(replaceMarkdown(boldRegex1, '<strong>$1</strong>')('__texto en negrita__ hola como wlkasjdhfoasjd'));
console.log(replaceMarkdown(italicRegex, '<em>$1</em>')('*texto en cursiva*, **texto en negrita**'));


function markdownUnorderedListToHTML (markdown) {
  const unorderedListRegex = /^\s*[*-+](.*)$/gm;

  const transformToUnorderedListHTML = (match, capturedText) => `    <li>${capturedText}</li>`;
  let listItems = markdown.replace(unorderedListRegex, transformToUnorderedListHTML);

  let HTMLText = `<ul>\n${listItems}\n</ul>`;

  // TO DO: poner atencion a doble tab que en realidad significa una sub-lista

  return HTMLText;
}

// Testing de la funcion
const markdownUnorderedList = `* Item 1
* Item 2
* Item 3`

console.log(markdownUnorderedListToHTML(markdownUnorderedList));

function markdownOrderedListToHTML (markdown) {
  const orderedListRegex = /^\s*\d+\.(.*)$/gm;

  // codigo repetido, se puede optimizar
  const transformToOrderedListHTML = (match, capturedText) => `    <li>${capturedText}</li>`;
  let listItems = markdown.replace(orderedListRegex, transformToOrderedListHTML);

  let HTMLText = `<ol>\n${listItems}\n</ol>`;

  // TO DO: poner atencion a doble tab que en realidad significa una sub-lista

  return HTMLText;
}

// Testing de la funcion
const markdownOrderedList = `1. Item 1
2. Item 2
3. Item 3`

console.log(markdownOrderedListToHTML(markdownOrderedList));

// BLOCKQUOTE

// Testing de la funcion
const markdownBlockquote = `> Blockquote 1
>
> Blockquote 3`


function markdownBlockquotesToHTML (markdown) {
  const blockquotesRegex = /^>(.*)$/gm;

  const transformToBlockquotesHTML = (match, capturedText) => `   ${capturedText}`;
  let blockquotesItems = markdown.replace(blockquotesRegex, transformToBlockquotesHTML);

  let HTMLText = `<blockquote>\n${blockquotesItems}\n</blockquote>`;

  return HTMLText;
}

console.log(markdownBlockquotesToHTML(markdownBlockquote));

// CODE BLOCK

// Testing de la funcion
const markdownCodeBlock = `This is a paragraph
\`\`\`
This is a code block
\`\`\`
This is the next paragraph
`

function markdownCodeBlockToHTML (markdown) {
  // code blocks start with ``` and end with ```. It can have multiple lines.
  const codeBlockRegex = /```([\s\S]*?)```/g;

  // replace the code block with the code block HTML, and remove the ``` from the start and end
  const transformToCodeBlockHTML = (match, capturedText) => `<code>${capturedText}</code>`;
  return markdown.replace(codeBlockRegex, transformToCodeBlockHTML);
}

console.log(markdownCodeBlockToHTML(markdownCodeBlock));

// PARAGRAPHS

// Testing de la funcion
const markdownParagraph = `This is a paragraph  
This is the next section of the paragraph

## This is a header

This is the next paragraph`

function markdownParagraphToHTML (markdown) {


  // Regex obtained from https://stackoverflow.com/questions/64451899/markdown-paragraph-tag-regex
  const paragraphRegex = /^[A-Za-z].*(?:\n[A-Za-z].*)*/gm;
  // replace new lines and double spaces with a break tag
  const breakTagRegex = /\s{2,}\n/g;
  
  const transformToParagraphHTML = (match) => `<p>${match.replace(breakTagRegex, '<br>')}</p>`;

  return markdown.replace(paragraphRegex, transformToParagraphHTML);
}

console.log(markdownParagraphToHTML(markdownParagraph));

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

console.log(markdownLinkToHTML(markdownLink));
console.log(markdownLinkToHTML(markdownLink2));

// URLS AND EMAILS

//Testing de la funcion
const markdownURl = `<https://www.google.com>`
const markdownURl2 = `<https://www.google.com> and <fake@example.com>`

function markdownURLToHTML (markdown) {
  const urlRegex = /<(.+?)>/g;

  const transformToURLHTML = (match, url) => `<a href="${url}">${url}</a>`;

  return markdown.replace(urlRegex, transformToURLHTML);
}

console.log(markdownURLToHTML(markdownURl));
console.log(markdownURLToHTML(markdownURl2));


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

console.log(markdownImageToHTML(markdownImage));
console.log(markdownImageToHTML(markdownImage2));