#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const STATIC_DIR = path.resolve(__dirname, '..', 'static');
const BUILD_DIR = path.resolve(__dirname, '..', 'build');

const STATIC_FILES = fs.readdirSync(STATIC_DIR);

for (const fileName of STATIC_FILES) {
  const resolvedFile = path.join(STATIC_DIR, fileName);
  const destinationFile = path.join(BUILD_DIR, fileName);
  fs.copyFileSync(resolvedFile, destinationFile);
}
