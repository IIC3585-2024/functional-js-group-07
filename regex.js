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
