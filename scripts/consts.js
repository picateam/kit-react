const path = require('path');

let __basename = path.dirname(__dirname);
let ENV = process.env.NODE_ENV;
let isProduction = ENV === 'production';

const SRC_PATH = path.resolve(__basename, 'src');
const DEV_PATH = path.resolve(__basename, 'dev');
const DIST_PATH = path.resolve(__basename, 'dist');
const SPRITE_PATH = path.resolve(__basename, 'src/img/sprites');

const DIST_CDN = 'cdn';
const DIST_WEBSERVER = 'webserver';


exports.SRC_PATH = SRC_PATH;
exports.DEV_PATH = DEV_PATH;
exports.DIST_PATH = DIST_PATH;
exports.SPRITE_PATH = SPRITE_PATH;
exports.DIST_CDN = DIST_CDN;
exports.DIST_WEBSERVER = DIST_WEBSERVER;

exports.ENV = ENV;
exports.isProduction = isProduction;
