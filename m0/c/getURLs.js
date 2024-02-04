#!/usr/bin/env node

const readline = require('readline');
const { JSDOM } = require('jsdom');
const { URL } = require('url');

// Example usage:
let baseURL = process.argv[2];

// console.log("baseURL: " + baseURL);

const rl = readline.createInterface({
  input: process.stdin,
});

// if (baseURL.endsWith("index.html/")) {
//   baseURL = baseURL.substring(0, baseURL.lastIndexOf("index.html/"));
// }

let base = new URL(baseURL);
// Check if the base URL ends with a file by looking for a '.' in the last segment
if (base.pathname.includes('/')) {
  const segments = base.pathname.split('/');
  const lastSegment = segments.pop(); // Remove the last segment
  if (lastSegment.includes('.')) { // Check if it looks like a file
    base.pathname = segments.join('/') + '/'; // Rebuild the pathname without the file
  }
}

// console.log("base: " + base);

// TODO some code
let htmlContent = '';

rl.on('line', (line) => {
  // TODO some code
  htmlContent += line + '\n';
});

rl.on('close', () => {
  // TODO some code
  const dom = new JSDOM(htmlContent, {
    url: base, // Set the base URL for resolving relative URLs
  });

  const document = dom.window.document;

  // Extract and print all URLs from <a> tags
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    // Resolve the URL against the base URL
    // console.log("link: " + link);
    const href = link.getAttribute('href');
    // console.log("href: " + href);
    const resolvedUrl = new URL(href, base).href;
    // console.log("resolvedURL: " + resolvedUrl);
    console.log(resolvedUrl)
  });
});
