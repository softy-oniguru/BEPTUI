// Error Overlay Client Script for BertUI
// This script catches compilation and runtime errors and displays them in a full-screen overlay

(function() {
  'use strict';

  let overlayElement = null;

  // Create overlay element
  function createOverlay() {
    if (overlayElement) return overlayElement;

    const overlay = document.createElement('div');
    overlay.id = 'bertui-error-overlay';
    overlay.style.cssText = `
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
    `;
    document.body.appendChild(overlay);
    overlayElement = overlay;
    return overlay;
  }

  // Show error overlay
  function showError(error) {
    const overlay = createOverlay();
    
    const errorType = error.type || 'Runtime Error';
    const errorMessage = error.message || 'Unknown error';
    const errorStack = error.stack || '';
    const errorFile = error.file || 'Unknown file';
    const errorLine = error.line || '';
    const errorColumn = error.column || '';

    overlay.innerHTML = `
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
              ${errorType}
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
            ${errorFile}${errorLine ? ':' + errorLine : ''}${errorColumn ? ':' + errorColumn : ''}
          </div>
          <div style="color: #fff; white-space: pre-wrap; word-break: break-word;">
            ${escapeHtml(errorMessage)}
          </div>
        </div>

        ${errorStack ? `
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
            ">${escapeHtml(errorStack)}</pre>
          </div>
        ` : ''}

        <div style="
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        ">
          <button onclick="window.__BERTUI_HIDE_ERROR__()" style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
            Dismiss (Esc)
          </button>
          <button onclick="window.location.reload()" style="
            background: #10b981;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          " onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
            Reload Page
          </button>
          <button onclick="console.clear()" style="
            background: #6b7280;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          " onmouseover="this.style.background='#4b5563'" onmouseout="this.style.background='#6b7280'">
            Clear Console
          </button>
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
    `;

    overlay.style.display = 'block';
  }

  // Hide error overlay
  function hideError() {
    if (overlayElement) {
      overlayElement.style.display = 'none';
    }
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Parse error stack
  function parseErrorStack(error) {
    const stack = error.stack || '';
    const lines = stack.split('\n');
    
    // Try to extract file, line, and column from stack
    for (const line of lines) {
      const match = line.match(/\((.+):(\d+):(\d+)\)/) || 
                    line.match(/at (.+):(\d+):(\d+)/) ||
                    line.match(/(.+):(\d+):(\d+)/);
      
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

  // Catch runtime errors
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

  // Catch unhandled promise rejections
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

  // Listen for compilation errors from HMR
  const ws = new WebSocket('ws://' + location.host + '/hmr');
  
  ws.onmessage = function(event) {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'compilation-error') {
        showError({
          type: 'Compilation Error',
          message: data.message,
          stack: data.stack,
          file: data.file,
          line: data.line,
          column: data.column
        });
      } else if (data.type === 'reload') {
        // Hide error on successful reload
        hideError();
      }
    } catch (e) {
      console.error('Error parsing HMR message:', e);
    }
  };

  // Expose functions globally
  window.__BERTUI_SHOW_ERROR__ = showError;
  window.__BERTUI_HIDE_ERROR__ = hideError;

  // Allow dismissing with Esc key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideError();
    }
  });

  console.log('%c🔥 BertUI Error Overlay Active', 'color: #10b981; font-weight: bold; font-size: 14px');
})();