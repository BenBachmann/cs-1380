#!/usr/bin/env node

// merge two files---the incoming 1-page index and the global index (on disk)
// the details of the global index can be seen in the test cases.

const fs = require('fs');
const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

// TODO some code here
let incomingIndex = '';
const globalIndexPath = process.argv[2];
const globalIndexContent = fs.readFileSync(globalIndexPath, 'ascii');


rl.on('line', (line) => {
  // TODO some code here
  incomingIndex += line + '\n';
});

rl.on('close', () => {
  mergeIndices();
});

const mergeIndices = () => {
  const incomingLines = incomingIndex.split('\n');
  let globalLines = globalIndexContent.split('\n');

  incomingLines.forEach(incomingLine => {
    const parts = incomingLine.split("|").map(part => part.trim());
    if (parts.length < 3) {
      // Skip lines that do not have at least 3 parts (NGram, frequency, URL)
      return;
    }
    const [incomingNGram, incomingFrequency, incomingURL] = parts;
    
    let found = false;
    globalLines = globalLines.map(globalLine => {
      const globalParts = globalLine.split('|').map(part => part.trim());
      // if (parts.length < 3) {
      //   // Skip lines that do not have at least 3 parts (NGram, frequency, URL)
      //   return;
      // }
      if (globalParts.length >= 1 && globalParts[0] === incomingNGram) {
        found = true;
        return `${globalLine} ${incomingURL} ${incomingFrequency}`;
      }
      return globalLine;
    });

    if (!found && incomingNGram) {
      globalLines.push(`${incomingNGram} | ${incomingURL} ${incomingFrequency}`);
    }
  });
  const mergedContent = globalLines.filter(line => line.trim() !== '').join('\n');
  console.log(mergedContent);
}

