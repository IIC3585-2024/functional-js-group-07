function replaceToLF(markdown) {
    return markdown.replace(/\r\n/g, '\n');
}

module.exports = { replaceToLF };