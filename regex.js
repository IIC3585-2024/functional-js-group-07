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

// Testing de la funcion
const markdownBlockquote = `> Blockquote 1
>
> Blockquote 3`


// blockquotes
function markdownBlockquotesToHTML (markdown) {
  const blockquotesRegex = /^>(.*)$/gm;

  const transformToBlockquotesHTML = (match, capturedText) => `   ${capturedText}`;
  let blockquotesItems = markdown.replace(blockquotesRegex, transformToBlockquotesHTML);

  let HTMLText = `<blockquote>\n${blockquotesItems}\n</blockquote>`;

  return HTMLText;
}

console.log(markdownBlockquotesToHTML(markdownBlockquote));

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

  let paragraphItems = markdown.replace(paragraphRegex, transformToParagraphHTML);
  
  return paragraphItems;
}

console.log(markdownParagraphToHTML(markdownParagraph));