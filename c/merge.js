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
rl.on('line', (line) => {
  // TODO some code here
});

rl.on('close', () => {
  mergeIndices();
});

const mergeIndices = () => {
  // TODO some code here
}

