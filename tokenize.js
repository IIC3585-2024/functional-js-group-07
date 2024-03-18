const fs = require('fs');
const path = require('path');

// Read the file
const file = path.join(__dirname, 'markdown.md');
const text = fs.readFileSync(file, 'utf8');

// Obtain the code block indexes
function codeBlockIndexes(paragraphObjects) {
    const codeIndexes = [];
    let isCode = false;
    paragraphObjects.forEach((p, i) => {
        if (p.text.startsWith('```')) {
            codeIndexes.push(i);
            isCode = !isCode;
        } else if (isCode) {
            codeIndexes.push(i);
        }
        // if line starts with 4 or more spaces or a tab, it's a code block
        else if (p.text.startsWith('    ')) {
            codeIndexes.push(i);
            p.text = p.text.slice(4);
        } else if (p.text.startsWith('\t')) {
            codeIndexes.push(i);
            p.text = p.text.slice(1);
        }
    });
    return codeIndexes;
}

// Create code block objects
function codeBlockObjects(paragraphObjects, codeIndexes) {
    if (codeIndexes.length === 0) {
        return paragraphObjects;
    }
    paragraphObjects.forEach((p, i) => {
        // get every code block (segments separated by ```)
        if (codeIndexes.includes(i)) {
            p.type = 'code';
            
        }
    });

    return paragraphObjects;
}

// Create paragraph objects
function pObjects(paragraphs) {
    const paragraphObjects = paragraphs.map(p => {
        let header = 0;
        let text = '';
        p.split('').forEach(char => {
            if (char === '#') {
                header++;
            } else {
                text += char;
            }
        });

        if (header === 0) {
            return {
                type: 'p',
                text
            };
        } else {
            return {
                type: 'h',
                level: header,
                text
            };
        }
    });
    return paragraphObjects;
}

// Get paragraphs
const paragraphs = text.split('\n').map(p => p.trimEnd()).map(p => p.trim().length > 0? p : '\n');

// Create paragraph objects
const paragraphObjects = pObjects(paragraphs);

// Get code block indexes
const codeIndexes = codeBlockIndexes(paragraphObjects);

// Create code block objects
const codeBlockParagraphs = codeBlockObjects(paragraphObjects, codeIndexes);

console.log(codeBlockParagraphs);