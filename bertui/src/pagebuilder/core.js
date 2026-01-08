// bertui/src/pagebuilder/core.js
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import logger from '../logger/logger.js';

/**
 * Run page builder to generate pages from config
 * @param {string} root - Project root directory
 * @param {Object} config - BertUI configuration
 */
export async function runPageBuilder(root, config) {
  const pagesDir = join(root, 'src', 'pages');
  
  if (!config.pageBuilder || typeof config.pageBuilder !== 'object') {
    logger.debug('No page builder configuration found');
    return;
  }
  
  const { pages } = config.pageBuilder;
  
  if (!pages || !Array.isArray(pages) || pages.length === 0) {
    logger.debug('No pages defined in page builder');
    return;
  }
  
  logger.info(`📄 Page Builder: Generating ${pages.length} page(s)...`);
  
  // Ensure pages directory exists
  const generatedDir = join(pagesDir, 'generated');
  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir, { recursive: true });
  }
  
  for (const page of pages) {
    try {
      await generatePage(page, generatedDir);
      logger.success(`✅ Generated: ${page.name}`);
    } catch (error) {
      logger.error(`❌ Failed to generate ${page.name}: ${error.message}`);
    }
  }
}

/**
 * Generate a single page from configuration
 * @param {Object} pageConfig - Page configuration
 * @param {string} outputDir - Output directory
 */
async function generatePage(pageConfig, outputDir) {
  const { name, type, data } = pageConfig;
  
  if (!name) {
    throw new Error('Page name is required');
  }
  
  let pageContent = '';
  
  switch (type) {
    case 'markdown':
      pageContent = generateMarkdownPage(name, data);
      break;
    
    case 'json':
      pageContent = generateJsonPage(name, data);
      break;
    
    case 'custom':
      pageContent = data.template || generateDefaultPage(name, data);
      break;
    
    default:
      pageContent = generateDefaultPage(name, data);
  }
  
  // Write the generated page
  const filename = name.toLowerCase().replace(/\s+/g, '-') + '.jsx';
  const filepath = join(outputDir, filename);
  
  await Bun.write(filepath, pageContent);
}

/**
 * Generate a default React page
 */
function generateDefaultPage(name, data) {
  const title = data?.title || name;
  const content = data?.content || `<p>Welcome to ${name}</p>`;
  
  return `// Auto-generated page: ${name}
import React from 'react';

export const title = "${title}";
export const description = "${data?.description || `${name} page`}";

export default function ${sanitizeComponentName(name)}() {
  return (
    <div>
      <h1>${title}</h1>
      ${content}
    </div>
  );
}
`;
}

/**
 * Generate a page from Markdown data
 */
function generateMarkdownPage(name, data) {
  const title = data?.title || name;
  const markdown = data?.markdown || '';
  
  // Simple markdown to JSX conversion
  const jsxContent = convertMarkdownToJSX(markdown);
  
  return `// Auto-generated markdown page: ${name}
import React from 'react';

export const title = "${title}";
export const description = "${data?.description || `${name} page`}";

export default function ${sanitizeComponentName(name)}() {
  return (
    <div className="markdown-content">
      ${jsxContent}
    </div>
  );
}
`;
}

/**
 * Generate a page from JSON data
 */
function generateJsonPage(name, data) {
  const title = data?.title || name;
  const items = data?.items || [];
  
  return `// Auto-generated JSON page: ${name}
import React from 'react';

export const title = "${title}";
export const description = "${data?.description || `${name} page`}";

const items = ${JSON.stringify(items, null, 2)};

export default function ${sanitizeComponentName(name)}() {
  return (
    <div>
      <h1>${title}</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.title || item.name || item}</li>
        ))}
      </ul>
    </div>
  );
}
`;
}

/**
 * Convert markdown to JSX (basic implementation)
 */
function convertMarkdownToJSX(markdown) {
  let jsx = markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Paragraphs
    .split('\n\n')
    .map(para => para.trim() ? `<p>${para}</p>` : '')
    .join('\n      ');
  
  return jsx;
}

/**
 * Sanitize component name (must be valid React component name)
 */
function sanitizeComponentName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^[0-9]/, 'Page$&')
    .replace(/^./, c => c.toUpperCase());
}