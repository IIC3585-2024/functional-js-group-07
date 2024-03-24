const { readFileSync } = require('fs');
const { markdownToHTMLText } = require('./regex.js');
const { htmlWriter } = require('./htmlWriter.js');

const filePath = process.argv[2];

try {
  const markdown = readFileSync(filePath, 'utf8');
  const content = markdownToHTMLText(markdown);
  const filename = filePath.split('/').pop().split('.')[0];
  htmlWriter(filename, content);
  
} catch (error) {
  console.log(error.message);
}