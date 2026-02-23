const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;
const APP_DIR = path.join(ROOT, 'app');
const WAVS_DIR = path.join(ROOT, 'wavs');

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.wav':  'audio/wav',
  '.mp3':  'audio/mpeg',
  '.ogg':  'audio/ogg',
  '.flac': 'audio/flac',
  '.aif':  'audio/aiff',
  '.aiff': 'audio/aiff',
  '.pdf':  'application/pdf',
  '.md':   'text/plain',
};

function serveFile(res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function serveWavList(res) {
  fs.readdir(WAVS_DIR, (err, files) => {
    if (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ files: [], error: 'wavs/ directory not found' }));
      return;
    }
    const audio = files
      .filter(f => /\.(wav|mp3|ogg|flac|aiff?)$/i.test(f))
      .sort();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ files: audio }));
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // API: list audio files in wavs/
  if (pathname === '/api/wavs') {
    serveWavList(res);
    return;
  }

  // Root → index
  if (pathname === '/') pathname = '/index.html';

  // Resolve file path: try app/ first for HTML files, then project root
  let filePath;
  if (pathname.endsWith('.html')) {
    const appPath = path.join(APP_DIR, pathname);
    const rootPath = path.join(ROOT, pathname);
    filePath = fs.existsSync(appPath) ? appPath : rootPath;
  } else {
    filePath = path.join(ROOT, pathname);
  }

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden');
    return;
  }

  serveFile(res, filePath);
});

server.listen(PORT, () => {
  let wavCount = 0;
  try {
    wavCount = fs.readdirSync(WAVS_DIR).filter(f => /\.(wav|mp3|ogg|flac|aiff?)$/i.test(f)).length;
  } catch(e) {}

  console.log('');
  console.log('  ∿ FUZZBOX PHYSICS ∿');
  console.log('  ────────────────────────────────────');
  console.log(`  Serving at  http://localhost:${PORT}`);
  console.log(`  Audio files ${wavCount} found in wavs/`);
  console.log('');
  console.log(`  Open http://localhost:${PORT}`);
  console.log('');
  console.log('  Drop audio files into wavs/ and refresh.');
  console.log('  Ctrl+C to stop.');
  console.log('');
});
