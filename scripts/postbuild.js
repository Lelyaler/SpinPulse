import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const assetsDir = path.join(distDir, 'assets');

const legacyJsBundles = [
  'index-DFgX3f-z.js',
  'index-WPTdffrw.js',
  'index-_Yot32gv.js',
  'index-D04hnQpA.js',
  'index-D8Dz-KkM.js',
  'index-BMXGpTVr.js',
  'index-Dy2WFpCU.js',
  'index-BTvUQN5G.js',
  'index-CjOlZST5.js'
];

const legacyCssBundles = [
  'index-2ihhpv3S.css',
  'index-DU7b2tMd.css',
  'index-BTVl36-I.css',
  'index-BuXnaO3m.css',
  'index-B2P25Wab.css',
  'index-Dlfim6Ap.css',
  'index-YekLHQos.css',
  'index-DiGuR97O.css',
  'index--oSczhgu.css'
];

const mainJsPath = path.join(assetsDir, 'index.js');
const mainCssPath = path.join(assetsDir, 'index.css');

if (fs.existsSync(mainJsPath)) {
  for (const bundle of legacyJsBundles) {
    const dest = path.join(assetsDir, bundle);
    fs.copyFileSync(mainJsPath, dest);
  }
}

if (fs.existsSync(mainCssPath)) {
  for (const bundle of legacyCssBundles) {
    const dest = path.join(assetsDir, bundle);
    fs.copyFileSync(mainCssPath, dest);
  }
}
