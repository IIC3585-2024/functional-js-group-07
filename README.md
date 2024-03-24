# Markdown to HTML Transpiler

This is a simple markdown to HTML transpiler written in functional JavaScript. It does not support all markdown features, but it supports most of the basic ones.

## Usage

To run the transpiler, you need to have Node.js installed on your machine. You can run the transpiler by running the following command in the terminal:

```
node ./src/index.js <input-file>
```

input-file is the path to the markdown file you want to transpile. The transpiled HTML will be written in the html-output directory.

## Supported Features

- [x] Headers (H1 to H6)
- [x] Emphasis
    - [x] Bold (** and __)
    - [x] Italics (* and _)
- Code
- Unordered lists (*, +, and -)
- Ordered lists (1., 2., etc.)
- Links (inline only, with title attribute)
- Images (inline only, with title and alt attributes)
- Blockquotes
- Code blocks (fenced)
- Paragraphs