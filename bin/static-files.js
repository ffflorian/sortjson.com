#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');

const CNAME_ORIGINAL_FILE = path.join(__dirname, '..', 'CNAME');
const CNAME_DEST_FILE = path.join(BUILD_DIR, 'CNAME');
const ROBOTS_FILE = path.join(BUILD_DIR, 'robots.txt');

const ROBOTS_CONTENT = 'User-agent: *\nAllow: /';

fs.writeFileSync(ROBOTS_FILE, ROBOTS_CONTENT, 'utf8');
fs.copyFileSync(CNAME_ORIGINAL_FILE, CNAME_DEST_FILE);
