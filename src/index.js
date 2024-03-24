const { readFileSync } = require('fs');
const { parseMarkdownToHTML } = require('./parser.js');
const { htmlWriter } = require('./htmlWriter.js');

const filePath = process.argv[2];

try {
  const markdown = readFileSync(filePath, 'utf8');
  const content = parseMarkdownToHTML(markdown);
  const filename = filePath.split('/').pop().split('.')[0];
  htmlWriter(filename, content);
  
} catch (error) {
  console.log(error.message);
}