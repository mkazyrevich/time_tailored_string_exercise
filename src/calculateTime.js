const selectMode = require('./selectMode');

const sourceFilePath = process.argv[3];
const targetFilePath = process.argv[4];

selectMode(sourceFilePath, targetFilePath);