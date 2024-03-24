const { readFileSync } = require('fs');
const { replaceToLF } = require('./replaceToLF.js');
const { parseMarkdownToHTML } = require('./parser.js');
const { htmlWriter } = require('./htmlWriter.js');

const filePath = process.argv[2];

try {
  let markdown = readFileSync(filePath, 'utf8');
  markdown = replaceToLF(markdown);
  const content = parseMarkdownToHTML(markdown);
  const filename = filePath.split('/').pop().split('.')[0];
  htmlWriter(filename, content);
  
} catch (error) {
  console.log(error.message);
}