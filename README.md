# Markdown to HTML Transpiler

This is a simple markdown to HTML transpiler written in functional JavaScript. It does not support all markdown features, but it supports most of the basic ones.

## Usage

To run the transpiler, you need to have Node.js installed on your machine. You can run the transpiler by running the following command in the terminal:

```
node ./src/index.js <input-file>
```

where `input-file` is the path to the markdown file you want to transpile. The transpiled HTML will be written in the `html-output` directory.

## Supported Features

- [x] Headers (H1 to H6)
- [x] Emphasis
    - [x] Bold (** and __)
    - [x] Italics (* and _)
    - [ ] Bold and Italics (*** and ___)
- [x] Code
- [x] Unordered lists (*, +, and -)
- [x] Ordered lists (1., 2., etc.)
- [x] Links (inline only, with title attribute)
- [x] Images (inline only, with title and alt attributes)
- [x] Blockquotes
- [x] Code blocks (fenced)
- [x] Paragraphs