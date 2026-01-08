// src/server/dev-server.js - FIXED: bertui-icons Support + Import Map
import { Elysia } from 'elysia';
import { watch } from 'fs';
import { join, extname } from 'path';
import { existsSync, readdirSync } from 'fs';
import logger from '../logger/logger.js';
import { compileProject } from '../client/compiler.js';
import { loadConfig } from '../config/loadConfig.js';

export async function startDevServer(options = {}) {
  const port = parseInt(options.port) || 3000;
  const root = options.root || process.cwd();
  const compiledDir = join(root, '.bertui', 'compiled');
  const stylesDir = join(root, '.bertui', 'styles');
  const srcDir = join(root, 'src');
  const publicDir = join(root, 'public');
  
  const config = await loadConfig(root);
  
  const clients = new Set();
  let hasRouter = false;
  
  const routerPath = join(compiledDir, 'router.js');
  if (existsSync(routerPath)) {
    hasRouter = true;
    logger.info('File-based routing enabled');
  }
  
  const app = new Elysia()
    .get('/', async () => {
      return await serveHTML(root, hasRouter, config); // ✅ FIX 1/3: Added await
    })
    
    // ✅ Serve images from src/images/
    .get('/images/*', async ({ params, set }) => {
      const srcImagesDir = join(srcDir, 'images');
      const filepath = join(srcImagesDir, params['*']);
      const file = Bun.file(filepath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'Image not found';
      }
      
      const ext = extname(filepath).toLowerCase();
      const contentType = getImageContentType(ext);
      
      return new Response(file, {
        headers: { 
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        }
      });
    })
    
    // ✅ Serve from public/ directory
    .get('/public/*', async ({ params, set }) => {
      const filepath = join(publicDir, params['*']);
      const file = Bun.file(filepath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'File not found';
      }
      
      return new Response(file, {
        headers: { 'Cache-Control': 'no-cache' }
      });
    })
    
    // ✅ Generic asset serving
    .get('/assets/*', async ({ params, set }) => {
      const filepath = join(srcDir, params['*']);
      const file = Bun.file(filepath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'Asset not found';
      }
      
      const ext = extname(filepath).toLowerCase();
      const contentType = getContentType(ext);
      
      return new Response(file, {
        headers: { 
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        }
      });
    })
    
    // ✅ CRITICAL FIX: Serve node_modules with correct MIME type
    .get('/node_modules/*', async ({ params, set }) => {
      const filepath = join(root, 'node_modules', params['*']);
      const file = Bun.file(filepath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'Module not found';
      }
      
      const ext = extname(filepath).toLowerCase();
      const contentType = ext === '.js' ? 'application/javascript; charset=utf-8' : getContentType(ext);
      
      return new Response(file, {
        headers: { 
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        }
      });
    })
    
    .get('/*', async ({ params, set }) => {
      const path = params['*'];
      
      if (path.includes('.')) {
        if (path.startsWith('compiled/')) {
          const filePath = join(compiledDir, path.replace('compiled/', ''));
          const file = Bun.file(filePath);
          
          if (await file.exists()) {
            const ext = extname(path);
            const contentType = ext === '.js' ? 'application/javascript' : getContentType(ext);
            
            return new Response(await file.text(), {
              headers: { 
                'Content-Type': contentType,
                'Cache-Control': 'no-store'
              }
            });
          }
        }
        
        if (path.startsWith('styles/') && path.endsWith('.css')) {
          const cssPath = join(stylesDir, path.replace('styles/', ''));
          const file = Bun.file(cssPath);
          
          if (await file.exists()) {
            return new Response(await file.text(), {
              headers: { 
                'Content-Type': 'text/css',
                'Cache-Control': 'no-store'
              }
            });
          }
        }
        
        set.status = 404;
        return 'File not found';
      }
      
      return await serveHTML(root, hasRouter, config); // ✅ FIX 2/3: Added await
    })
    
    .get('/hmr-client.js', () => {
      const script = `
const ws = new WebSocket('ws://localhost:${port}/hmr');

ws.onopen = () => {
  console.log('%c🔥 BertUI HMR connected', 'color: #10b981; font-weight: bold');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'reload') {
    console.log('%c🔄 Reloading...', 'color: #f59e0b');
    window.location.reload();
  }
  
  if (data.type === 'recompiling') {
    console.log('%c⚙️ Recompiling...', 'color: #3b82f6');
  }

  if (data.type === 'compilation-error') {
    console.error('%c❌ Compilation Error', 'color: #ef4444; font-weight: bold');
    console.error(data.message);
    if (window.__BERTUI_SHOW_ERROR__) {
      window.__BERTUI_SHOW_ERROR__(data);
    }
  }
};

ws.onerror = (error) => {
  console.error('%c❌ HMR connection error', 'color: #ef4444', error);
};

ws.onclose = () => {
  console.log('%c⚠️ HMR disconnected. Refresh to reconnect.', 'color: #f59e0b');
};
`;
      
      return new Response(script, {
        headers: { 'Content-Type': 'application/javascript' }
      });
    })

    .get('/error-overlay.js', () => {
      const errorOverlayScript = `
(function() {
  'use strict';

  let overlayElement = null;

  function createOverlay() {
    if (overlayElement) return overlayElement;

    const overlay = document.createElement('div');
    overlay.id = 'bertui-error-overlay';
    overlay.style.cssText = \`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      color: #fff;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.5;
      z-index: 9999999;
      overflow: auto;
      padding: 20px;
      box-sizing: border-box;
      display: none;
    \`;
    document.body.appendChild(overlay);
    overlayElement = overlay;
    return overlay;
  }

  function showError(error) {
    const overlay = createOverlay();
    
    const errorType = error.type || 'Runtime Error';
    const errorMessage = error.message || 'Unknown error';
    const errorStack = error.stack || '';
    const errorFile = error.file || 'Unknown file';
    const errorLine = error.line || '';
    const errorColumn = error.column || '';

    overlay.innerHTML = \`
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; align-items: center; margin-bottom: 30px;">
          <div style="
            background: #ef4444;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-right: 15px;
          ">❌</div>
          <div>
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ef4444;">
              \${errorType}
            </h1>
            <p style="margin: 5px 0 0 0; color: #a0a0a0; font-size: 14px;">
              BertUI detected an error in your application
            </p>
          </div>
        </div>

        <div style="
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        ">
          <div style="color: #fbbf24; font-weight: bold; margin-bottom: 10px;">
            \${errorFile}\${errorLine ? ':' + errorLine : ''}\${errorColumn ? ':' + errorColumn : ''}
          </div>
          <div style="color: #fff; white-space: pre-wrap; word-break: break-word;">
            \${escapeHtml(errorMessage)}
          </div>
        </div>

        \${errorStack ? \`
          <div style="
            background: #0a0a0a;
            border: 1px solid #222;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          ">
            <div style="color: #a0a0a0; font-weight: bold; margin-bottom: 10px;">
              Stack Trace:
            </div>
            <pre style="
              margin: 0;
              color: #d0d0d0;
              white-space: pre-wrap;
              word-break: break-word;
              font-size: 12px;
            ">\${escapeHtml(errorStack)}</pre>
          </div>
        \` : ''}

        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
          <button onclick="window.__BERTUI_HIDE_ERROR__()" style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          ">Dismiss (Esc)</button>
          <button onclick="window.location.reload()" style="
            background: #10b981;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          ">Reload Page</button>
        </div>

        <div style="
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #333;
          color: #666;
          font-size: 12px;
        ">
          💡 <strong>Tip:</strong> Fix the error in your code, and the page will automatically reload with HMR.
        </div>
      </div>
    \`;

    overlay.style.display = 'block';
  }

  function hideError() {
    if (overlayElement) {
      overlayElement.style.display = 'none';
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function parseErrorStack(error) {
    const stack = error.stack || '';
    const lines = stack.split('\\n');
    
    for (const line of lines) {
      const match = line.match(/\\((.+):(\\d+):(\\d+)\\)/) || 
                    line.match(/at (.+):(\\d+):(\\d+)/) ||
                    line.match(/(.+):(\\d+):(\\d+)/);
      
      if (match) {
        return {
          file: match[1].trim(),
          line: match[2],
          column: match[3]
        };
      }
    }
    
    return { file: null, line: null, column: null };
  }

  window.addEventListener('error', function(event) {
    const { file, line, column } = parseErrorStack(event.error || {});
    
    showError({
      type: 'Runtime Error',
      message: event.message,
      stack: event.error ? event.error.stack : null,
      file: event.filename || file,
      line: event.lineno || line,
      column: event.colno || column
    });
  });

  window.addEventListener('unhandledrejection', function(event) {
    const error = event.reason;
    const { file, line, column } = parseErrorStack(error);
    
    showError({
      type: 'Unhandled Promise Rejection',
      message: error?.message || String(event.reason),
      stack: error?.stack,
      file,
      line,
      column
    });
  });

  window.__BERTUI_SHOW_ERROR__ = showError;
  window.__BERTUI_HIDE_ERROR__ = hideError;

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideError();
    }
  });

  console.log('%c🔥 BertUI Error Overlay Active', 'color: #10b981; font-weight: bold; font-size: 14px');
})();
`;
      
      return new Response(errorOverlayScript, {
        headers: { 'Content-Type': 'application/javascript' }
      });
    })
    
    .ws('/hmr', {
      open(ws) {
        clients.add(ws);
        logger.info('Client connected to HMR');
      },
      close(ws) {
        clients.delete(ws);
        logger.info('Client disconnected from HMR');
      }
    })
    
// Replace the /compiled/* handler in bertui/src/server/dev-server.js

.get('/compiled/*', async ({ params, set }) => {
  const requestedPath = params['*'];
  const filepath = join(compiledDir, requestedPath);
  
  // Check if file exists
  const file = Bun.file(filepath);
  if (!await file.exists()) {
    logger.warn(`File not found: /compiled/${requestedPath}`);
    set.status = 404;
    return 'File not found';
  }
  
  // CRITICAL FIX: Always return JavaScript files with correct MIME type
  const ext = extname(filepath).toLowerCase();
  
  let contentType;
  if (ext === '.js' || ext === '.jsx' || ext === '.mjs') {
    contentType = 'application/javascript; charset=utf-8';
  } else if (ext === '.json') {
    contentType = 'application/json; charset=utf-8';
  } else if (ext === '.css') {
    contentType = 'text/css; charset=utf-8';
  } else {
    contentType = 'text/plain; charset=utf-8';
  }
  
  logger.debug(`Serving: /compiled/${requestedPath} (${contentType})`);
  
  return new Response(file, {
    headers: { 
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
})
    .get('/styles/*', async ({ params, set }) => {
      const filepath = join(stylesDir, params['*']);
      const file = Bun.file(filepath);
      
      if (!await file.exists()) {
        set.status = 404;
        return 'CSS file not found';
      }
      
      return new Response(await file.text(), {
        headers: { 
          'Content-Type': 'text/css',
          'Cache-Control': 'no-store'
        }
      });
    })
    
    .listen(port);
  
  if (!app.server) {
    logger.error('Failed to start server');
    process.exit(1);
  }
  
  logger.success(`🚀 Server running at http://localhost:${port}`);
  logger.info(`📁 Serving: ${root}`);
  logger.info(`🖼️  Images: /images/* → src/images/`);
  logger.info(`📦 Public: /public/* → public/`);
  logger.info(`⚡ BertUI Packages: /node_modules/* → node_modules/`);
  
  setupWatcher(root, compiledDir, clients, async () => {
    hasRouter = existsSync(join(compiledDir, 'router.js'));
  });
  
  return app;
}
// Update serveHTML function in bertui/src/server/dev-server.js
// This version auto-detects ALL bertui-* packages

async function serveHTML(root, hasRouter, config) { // ✅ FIX 3/3: Added async
  const meta = config.meta || {};
  
  const srcStylesDir = join(root, 'src', 'styles');
  let userStylesheets = '';
  
  if (existsSync(srcStylesDir)) {
    try {
      const cssFiles = readdirSync(srcStylesDir).filter(f => f.endsWith('.css'));
      userStylesheets = cssFiles.map(f => `  <link rel="stylesheet" href="/styles/${f}">`).join('\n');
    } catch (error) {
      logger.warn(`Could not read styles directory: ${error.message}`);
    }
  }
  
  // Build import map
  const importMap = {
    "react": "https://esm.sh/react@18.2.0",
    "react-dom": "https://esm.sh/react-dom@18.2.0",
    "react-dom/client": "https://esm.sh/react-dom@18.2.0/client"
  };
  
  // ✅ AUTO-DETECT ALL bertui-* PACKAGES
  const nodeModulesDir = join(root, 'node_modules');
  
  if (existsSync(nodeModulesDir)) {
    try {
      const packages = readdirSync(nodeModulesDir);
      
      for (const pkg of packages) {
        // Skip non-bertui packages
        if (!pkg.startsWith('bertui-')) continue;
        
        const pkgDir = join(nodeModulesDir, pkg);
        const pkgJsonPath = join(pkgDir, 'package.json');
        
        // Skip if no package.json
        if (!existsSync(pkgJsonPath)) continue;
        
        try {
          const pkgJsonContent = await Bun.file(pkgJsonPath).text();
          const pkgJson = JSON.parse(pkgJsonContent);
          
          // Resolve main entry point
          let mainFile = null;
          
          // Try exports field first (modern)
          if (pkgJson.exports) {
            const rootExport = pkgJson.exports['.'];
            if (typeof rootExport === 'string') {
              mainFile = rootExport;
            } else if (typeof rootExport === 'object') {
              // Prefer browser build, fallback to default
              mainFile = rootExport.browser || rootExport.default || rootExport.import;
            }
          }
          
          // Fallback to main field
          if (!mainFile) {
            mainFile = pkgJson.main || 'index.js';
          }
          
          // Verify file exists
          const fullPath = join(pkgDir, mainFile);
          if (existsSync(fullPath)) {
            importMap[pkg] = `/node_modules/${pkg}/${mainFile}`;
            logger.info(`✅ ${pkg} available`);
          } else {
            logger.warn(`⚠️  ${pkg} main file not found: ${mainFile}`);
          }
          
        } catch (error) {
          logger.warn(`⚠️  Failed to parse ${pkg}/package.json: ${error.message}`);
        }
      }
      
    } catch (error) {
      logger.warn(`Failed to scan node_modules: ${error.message}`);
    }
  }
  
  const html = `<!DOCTYPE html>
<html lang="${meta.lang || 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title || 'BertUI App'}</title>
  
  ${meta.description ? `<meta name="description" content="${meta.description}">` : ''}
  ${meta.keywords ? `<meta name="keywords" content="${meta.keywords}">` : ''}
  ${meta.author ? `<meta name="author" content="${meta.author}">` : ''}
  ${meta.themeColor ? `<meta name="theme-color" content="${meta.themeColor}">` : ''}
  
  ${meta.ogTitle ? `<meta property="og:title" content="${meta.ogTitle || meta.title}">` : ''}
  ${meta.ogDescription ? `<meta property="og:description" content="${meta.ogDescription || meta.description}">` : ''}
  ${meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}">` : ''}
  
  <link rel="icon" type="image/svg+xml" href="/public/favicon.svg">
  
${userStylesheets}
  
  <script type="importmap">
  ${JSON.stringify({ imports: importMap }, null, 2)}
  </script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/error-overlay.js"></script>
  <script type="module" src="/hmr-client.js"></script>
  <script type="module" src="/compiled/main.js"></script>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
function getImageContentType(ext) {
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon'
  };
  
  return types[ext] || 'application/octet-stream';
}

function getContentType(ext) {
  const types = {
    '.js': 'application/javascript',
    '.jsx': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mp3': 'audio/mpeg'
  };
  
  return types[ext] || 'text/plain';
}

function setupWatcher(root, compiledDir, clients, onRecompile) {
  const srcDir = join(root, 'src');
  const configPath = join(root, 'bertui.config.js');
  
  if (!existsSync(srcDir)) {
    logger.warn('src/ directory not found');
    return;
  }
  
  logger.info(`👀 Watching: ${srcDir}`);
  
  watch(srcDir, { recursive: true }, async (eventType, filename) => {
    if (!filename) return;
    
    const ext = extname(filename);
    const watchedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'];
    
    if (watchedExtensions.includes(ext)) {
      logger.info(`📝 File changed: ${filename}`);
      
      if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'].includes(ext)) {
        for (const client of clients) {
          try {
            client.send(JSON.stringify({ type: 'reload', file: filename }));
          } catch (e) {
            clients.delete(client);
          }
        }
        return;
      }
      
      for (const client of clients) {
        try {
          client.send(JSON.stringify({ type: 'recompiling' }));
        } catch (e) {
          clients.delete(client);
        }
      }
      
      try {
        await compileProject(root);
        
        if (onRecompile) {
          await onRecompile();
        }
        
        for (const client of clients) {
          try {
            client.send(JSON.stringify({ type: 'reload', file: filename }));
          } catch (e) {
            clients.delete(client);
          }
        }
      } catch (error) {
        logger.error(`Recompilation failed: ${error.message}`);
        
        for (const client of clients) {
          try {
            client.send(JSON.stringify({
              type: 'compilation-error',
              message: error.message,
              stack: error.stack,
              file: filename
            }));
          } catch (e) {
            clients.delete(client);
          }
        }
      }
    }
  });
  
  if (existsSync(configPath)) {
    watch(configPath, async (eventType) => {
      if (eventType === 'change') {
        logger.info('📝 Config changed, reloading...');
        
        for (const client of clients) {
          try {
            client.send(JSON.stringify({ type: 'reload', file: 'bertui.config.js' }));
          } catch (e) {
            clients.delete(client);
          }
        }
      }
    });
  }
}