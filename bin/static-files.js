#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');

const CNAME_FILE = path.join(BUILD_DIR, 'CNAME');
const ROBOTS_FILE = path.join(BUILD_DIR, 'robots.txt');

const CNAME_CONTENT = 'www.sortjson.com';
const ROBOTS_CONTENT = 'User-agent: *\nAllow: /';

fs.writeFileSync(CNAME_FILE, CNAME_CONTENT, 'utf8');
fs.writeFileSync(ROBOTS_FILE, ROBOTS_CONTENT, 'utf8');
