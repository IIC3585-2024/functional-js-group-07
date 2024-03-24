const pipe = functions => data => functions.reduce((value, func) => func(value), data);

module.exports = { pipe };
