const { readFileSync } = require('fs');
const { replaceToLF } = require('./replaceToLF.js');
const { parseMarkdownToHTML } = require('./parser.js');
const { htmlWriter } = require('./htmlWriter.js');
const { pipe } = require('./pipe.js');

const transpiler = filePath => {
  const filename = filePath.split('/').pop().split('.')[0];
  const readFileUTF8 = filePath => readFileSync(filePath, 'utf8');
  const writeHTMLOnFile = filename => content => htmlWriter(filename, content);

  const functions = [
    readFileUTF8,
    replaceToLF,
    parseMarkdownToHTML,
    writeHTMLOnFile(filename)
  ]

  return pipe(functions)(filePath);
}

module.exports = { transpiler };
