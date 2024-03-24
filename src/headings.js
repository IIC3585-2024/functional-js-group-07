const { replaceMarkdown } = require('./replaceMarkdown');
const { pipe } = require('./pipe');

const headingsRegex = [
  /^#(?!#)\s*(.*)$/gim,
  /^##(?!#)\s*(.*)$/gim,
  /^###(?!#)\s*(.*)$/gim,
  /^####(?!#)\s*(.*)$/gim,
  /^#####(?!#)\s*(.*)$/gim,
  /^######\s*(.*)$/gim,
]

const headingsRegexHTML = headingsRegex.map(
  (regex, index) => [regex, `<h${index + 1}>$1</h${index + 1}>`]
);

const headingsParserFunctions = headingsRegexHTML.map(arr => replaceMarkdown(arr[0])(arr[1]));
const headingsParser = markdown => pipe(headingsParserFunctions)(markdown);

module.exports = { headingsParser };
