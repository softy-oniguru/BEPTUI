// bertui/src/utils/meta-extractor.js

/**
 * Extract meta information from page component source code
 * @param {string} sourceCode - Component source code
 * @returns {Object} Extracted meta information
 */
export function extractMetaFromSource(sourceCode) {
  const meta = {};
  
  // Extract title
  const titleMatch = sourceCode.match(/export\s+const\s+title\s*=\s*['"]([^'"]+)['"]/);
  if (titleMatch) {
    meta.title = titleMatch[1];
  }
  
  // Extract description
  const descMatch = sourceCode.match(/export\s+const\s+description\s*=\s*['"]([^'"]+)['"]/);
  if (descMatch) {
    meta.description = descMatch[1];
  }
  
  // Extract keywords
  const keywordsMatch = sourceCode.match(/export\s+const\s+keywords\s*=\s*['"]([^'"]+)['"]/);
  if (keywordsMatch) {
    meta.keywords = keywordsMatch[1];
  }
  
  // Extract author
  const authorMatch = sourceCode.match(/export\s+const\s+author\s*=\s*['"]([^'"]+)['"]/);
  if (authorMatch) {
    meta.author = authorMatch[1];
  }
  
  // Extract og:title
  const ogTitleMatch = sourceCode.match(/export\s+const\s+ogTitle\s*=\s*['"]([^'"]+)['"]/);
  if (ogTitleMatch) {
    meta.ogTitle = ogTitleMatch[1];
  }
  
  // Extract og:description
  const ogDescMatch = sourceCode.match(/export\s+const\s+ogDescription\s*=\s*['"]([^'"]+)['"]/);
  if (ogDescMatch) {
    meta.ogDescription = ogDescMatch[1];
  }
  
  // Extract og:image
  const ogImageMatch = sourceCode.match(/export\s+const\s+ogImage\s*=\s*['"]([^'"]+)['"]/);
  if (ogImageMatch) {
    meta.ogImage = ogImageMatch[1];
  }
  
  // Extract language
  const langMatch = sourceCode.match(/export\s+const\s+lang\s*=\s*['"]([^'"]+)['"]/);
  if (langMatch) {
    meta.lang = langMatch[1];
  }
  
  // Extract theme color
  const themeMatch = sourceCode.match(/export\s+const\s+themeColor\s*=\s*['"]([^'"]+)['"]/);
  if (themeMatch) {
    meta.themeColor = themeMatch[1];
  }
  
  return meta;
}

/**
 * Generate HTML meta tags from meta object
 * @param {Object} meta - Meta information object
 * @returns {string} HTML meta tags
 */
export function generateMetaTags(meta) {
  const tags = [];
  
  if (meta.title) {
    tags.push(`<title>${escapeHtml(meta.title)}</title>`);
  }
  
  if (meta.description) {
    tags.push(`<meta name="description" content="${escapeHtml(meta.description)}">`);
  }
  
  if (meta.keywords) {
    tags.push(`<meta name="keywords" content="${escapeHtml(meta.keywords)}">`);
  }
  
  if (meta.author) {
    tags.push(`<meta name="author" content="${escapeHtml(meta.author)}">`);
  }
  
  if (meta.themeColor) {
    tags.push(`<meta name="theme-color" content="${escapeHtml(meta.themeColor)}">`);
  }
  
  // Open Graph tags
  if (meta.ogTitle) {
    tags.push(`<meta property="og:title" content="${escapeHtml(meta.ogTitle)}">`);
  }
  
  if (meta.ogDescription) {
    tags.push(`<meta property="og:description" content="${escapeHtml(meta.ogDescription)}">`);
  }
  
  if (meta.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(meta.ogImage)}">`);
  }
  
  return tags.join('\n  ');
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return String(text).replace(/[&<>"']/g, m => map[m]);
}