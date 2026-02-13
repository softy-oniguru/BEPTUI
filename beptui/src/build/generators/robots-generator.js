// bertui/src/build/robots-generator.js
import { join } from 'path';
import logger from '../../logger/logger.js';

/**
 * Generate robots.txt from sitemap data
 * @param {Object} config - BertUI config with baseUrl
 * @param {string} outDir - Output directory (dist/)
 * @param {Array} routes - Optional: routes to disallow (e.g., admin pages)
 */
export async function generateRobots(config, outDir, routes = []) {
  logger.info('🤖 Generating robots.txt...');
  
  // ✅ FIX: Check if baseUrl exists, then remove trailing slash
  if (!config?.baseUrl) {
    logger.error('❌ baseUrl is required in bertui.config.js for robots.txt generation!');
    logger.error('   Add: baseUrl: "https://your-domain.com" to your config');
    throw new Error('Missing baseUrl in config - robots.txt generation failed');
  }
  
  const baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  
  logger.info(`   Sitemap URL: ${sitemapUrl}`);
  
  // Default robots.txt - Allow all
  let robotsTxt = `# BertUI Generated robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: ${sitemapUrl}
`;
  
  // Add custom disallow rules if specified in config
  if (config?.robots?.disallow && Array.isArray(config.robots.disallow) && config.robots.disallow.length > 0) {
    robotsTxt += '\n# Custom Disallow Rules\n';
    config.robots.disallow.forEach(path => {
      robotsTxt += `Disallow: ${path}\n`;
    });
    logger.info(`   Blocked ${config.robots.disallow.length} path(s)`);
  }
  
  // Add crawl delay if specified
  if (config?.robots?.crawlDelay && typeof config.robots.crawlDelay === 'number') {
    robotsTxt += `\nCrawl-delay: ${config.robots.crawlDelay}\n`;
    logger.info(`   Crawl delay: ${config.robots.crawlDelay}s`);
  }
  
  // Write to dist/robots.txt
  const robotsPath = join(outDir, 'robots.txt');
  await Bun.write(robotsPath, robotsTxt);
  
  logger.success('✅ robots.txt generated');
  logger.info(`   Location: ${robotsPath}`);
  
  return { path: robotsPath, content: robotsTxt };
}