const { transpiler } = require('./transpiler.js');

const filePath = process.argv[2];

try {
  transpiler(filePath);
} catch (error) {
  console.log(error.message);
}