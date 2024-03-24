const { writeFile } = require('fs');

const htmlWriter = (filename, content) => {
  const formattedContent = content.replace(/\n/g, '\n    ').trim();
  const html = 
  `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${filename}</title>
    </head>
    <body>
      ${formattedContent}
    </body>
  </html>
  `.trim().replace(/^\s\s/gm, '');

  writeFile(`${filename}.html`, html, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${filename}.html written successfully!`);
  });
}

module.exports = { htmlWriter };
