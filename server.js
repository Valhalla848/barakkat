import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files - check both dist and root
const staticPaths = [
  path.join(__dirname, 'dist'),
  __dirname
];

// Try to find index.html
let staticPath = staticPaths.find(p => existsSync(path.join(p, 'index.html')));

if (!staticPath) {
  staticPath = __dirname; // Fallback to root
  console.warn('Warning: dist folder not found, serving from root');
}

console.log(`Serving static files from: ${staticPath}`);

app.use(express.static(staticPath));

// For SPA - all routes return index.html
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  console.log(`Serving index.html from: ${indexPath}`);
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  console.log(`Static files directory: ${staticPath}`);
});

